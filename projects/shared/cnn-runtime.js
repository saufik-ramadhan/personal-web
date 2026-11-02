/* Local image processing and exact integer inference for static GitHub Pages.
 * No remote inference service, external library, or upload endpoint is used.
 */
'use strict';
let packagePromise;
function loadCnnPackage() {
  return packagePromise ||= fetch('./model.json').then(r=>{
    if(!r.ok) throw Error('Bobot model tidak dapat dimuat.');
    return r.json();
  });
}
function roundEven(n) {
  const floor=Math.floor(n),fraction=n-floor;
  return fraction===.5 ? floor+(floor%2!==0?1:0) : Math.round(n);
}
function imageCanvas(width,height) {
  const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;
  return canvas;
}
function grayUri(values,width,height) {
  if(typeof document==='undefined')return null; // Numerical tests do not need image previews.
  const canvas=imageCanvas(width,height),ctx=canvas.getContext('2d'),pixels=ctx.createImageData(width,height);
  values.forEach((v,i)=>{pixels.data.set([v,v,v,255],i*4);});
  ctx.putImageData(pixels,0,0);return canvas.toDataURL('image/png');
}
function cropGray(values,width,x,y,w,h) {
  const output=new Uint8Array(w*h);
  for(let row=0;row<h;row++) output.set(values.subarray((y+row)*width+x,(y+row)*width+x+w),row*w);
  return output;
}
// Pillow-compatible separable bilinear kernel, with its 22-bit coefficients.
function resizeGray(values,width,height,targetWidth,targetHeight) {
  function coefficients(from,to) {
    const scale=from/to,filterScale=Math.max(1,scale),support=filterScale;
    return Array.from({length:to},(_,i)=>{
      const center=(i+.5)*scale;
      const start=Math.max(0,Math.trunc(center-support+.5));
      const end=Math.min(from,Math.trunc(center+support+.5));
      const weights=Array.from({length:end-start},(_,j)=>Math.max(0,1-Math.abs((start+j-center+.5)/filterScale)));
      const total=weights.reduce((a,b)=>a+b,0);
      return {start,weights:weights.map(v=>Math.floor(v/total*4194304+.5))};
    });
  }
  let horizontal=values;
  if(width!==targetWidth) {
    const xweights=coefficients(width,targetWidth);horizontal=new Uint8Array(targetWidth*height);
    for(let y=0;y<height;y++) for(let x=0;x<targetWidth;x++) {
      const {start,weights}=xweights[x];let sum=2097152;
      weights.forEach((w,j)=>sum+=w*values[y*width+start+j]);
      horizontal[y*targetWidth+x]=Math.max(0,Math.min(255,Math.floor(sum/4194304)));
    }
  }
  if(height===targetHeight) return horizontal;
  const yweights=coefficients(height,targetHeight),output=new Uint8Array(targetWidth*targetHeight);
  for(let y=0;y<targetHeight;y++) for(let x=0;x<targetWidth;x++) {
    const {start,weights}=yweights[y];let sum=2097152;
    weights.forEach((w,j)=>sum+=w*horizontal[(start+j)*targetWidth+x]);
    output[y*targetWidth+x]=Math.max(0,Math.min(255,Math.floor(sum/4194304)));
  }
  return output;
}
function median(values) {
  const sorted=Array.from(values).sort((a,b)=>a-b),middle=sorted.length>>1;
  return sorted.length%2?sorted[middle]:(sorted[middle-1]+sorted[middle])/2;
}
function prepareCnnImage(gray,width,height,contract,roi) {
  if(contract.dataset==='MNIST') {
    if(roi) throw Error('Crop digit MNIST dilakukan otomatis.');
    const border=[];
    for(let x=0;x<width;x++)border.push(gray[x],gray[(height-1)*width+x]);
    for(let y=0;y<height;y++)border.push(gray[y*width],gray[y*width+width-1]);
    const inverted=median(border)>127,values=Uint8Array.from(gray,v=>inverted?255-v:v);
    let x1=width,y1=height,x2=-1,y2=-1,count=0,min=255,max=0;
    values.forEach((v,i)=>{min=Math.min(min,v);max=Math.max(max,v);if(v>35){const x=i%width,y=Math.floor(i/width);x1=Math.min(x1,x);y1=Math.min(y1,y);x2=Math.max(x2,x);y2=Math.max(y2,y);count++;}});
    if(count<3||max-min<20)throw Error('Belum ada digit yang terlihat. Tulis satu angka dengan garis yang jelas.');
    const w=x2-x1+1,h=y2-y1+1,crop=cropGray(values,width,x1,y1,w,h);
    let pixels=values,method='Input 28×28 dipertahankan; hanya polaritas diperiksa.';
    if(width!==28||height!==28) {
      const scale=20/Math.max(w,h),rw=Math.max(1,roundEven(w*scale)),rh=Math.max(1,roundEven(h*scale));
      const resized=resizeGray(crop,w,h,rw,rh),center=new Uint8Array(784);
      const ox=Math.floor((28-rw)/2),oy=Math.floor((28-rh)/2);
      for(let y=0;y<rh;y++)center.set(resized.subarray(y*rw,(y+1)*rw),(oy+y)*28+ox);
      let sum=0,xsum=0,ysum=0;center.forEach((v,i)=>{sum+=v;xsum+=v*(i%28);ysum+=v*Math.floor(i/28);});
      const dx=roundEven(13.5-xsum/sum),dy=roundEven(13.5-ysum/sum);pixels=new Uint8Array(784);
      center.forEach((v,i)=>{const x=i%28+dx,y=Math.floor(i/28)+dy;if(x>=0&&x<28&&y>=0&&y<28)pixels[y*28+x]=v;});
      method='Crop digit → muat dalam 20×20 → kanvas 28×28 → pusat massa.';
    }
    return {pixels,crop:grayUri(crop,w,h),grayscale:grayUri(values,width,height),roi:[0,0,27,27],
      preprocessing:{inverted,method,foreground_bbox:[x1,y1,x2+1,y2+1]}};
  }
  roi ||= [0,0,width-1,height-1];
  if(!Array.isArray(roi)||roi.length!==4||!roi.every(Number.isInteger))throw Error('ROI harus berisi empat koordinat integer.');
  const [x1,y1,x2,y2]=roi;
  if(!(0<=x1&&x1<x2&&x2<width&&0<=y1&&y1<y2&&y2<height))throw Error('Koordinat ROI berada di luar gambar atau terlalu kecil.');
  const w=x2-x1+1,h=y2-y1+1,crop=cropGray(gray,width,x1,y1,w,h);
  return {pixels:resizeGray(crop,w,h,contract.image_size,contract.image_size),crop:grayUri(crop,w,h),
    grayscale:grayUri(crop,w,h),roi};
}
function inferCnnInteger(pixels,parameters,contract) {
  const side=contract.image_size,conv=side-2,poolSide=conv/2;
  if(pixels.length!==side*side||!Array.from(pixels).every(v=>Number.isInteger(v)&&v>=0&&v<=255))throw Error('Input pixel tidak valid.');
  const matrix=(s)=>Array.from({length:s},()=>Array(s).fill(0));
  const input=[Array.from({length:side},(_,y)=>Array.from(pixels.slice(y*side,(y+1)*side)))];
  const conv_acc=[],activation=[],relu=[],pool=[],flat=[],scores=[],contributions=[];
  const q=contract.requantization,rounding=q.shift?2**(q.shift-1):0;
  function checked32(v){if(!Number.isSafeInteger(v)||v< -2147483648||v>2147483647)throw Error('Accumulator overflow.');return v;}
  for(let f=0;f<contract.filters;f++) {
    const acc=matrix(conv),act=matrix(conv),positive=matrix(conv),pooled=matrix(poolSide);
    for(let y=0;y<conv;y++)for(let x=0;x<conv;x++) {
      let value=parameters.conv_bias[f];
      for(let ky=0;ky<3;ky++)for(let kx=0;kx<3;kx++)value+=pixels[(y+ky)*side+x+kx]*parameters.conv_weight[f][0][ky][kx];
      acc[y][x]=checked32(value);positive[y][x]=Math.max(0,value);
      const scaled=positive[y][x]*q.multiplier+rounding;
      if(!Number.isSafeInteger(scaled))throw Error('Rescale exceeds exact browser integer range.');
      act[y][x]=Math.min(127,Math.floor(scaled/(2**q.shift)));
    }
    for(let y=0;y<poolSide;y++)for(let x=0;x<poolSide;x++) {
      pooled[y][x]=Math.max(act[y*2][x*2],act[y*2][x*2+1],act[y*2+1][x*2],act[y*2+1][x*2+1]);flat.push(pooled[y][x]);
    }
    conv_acc.push(acc);activation.push(act);relu.push(positive);pool.push(pooled);
  }
  for(let c=0;c<contract.classes.length;c++) {
    const parts=flat.map((v,i)=>(v*parameters.fc_weight[c][i])||0);
    scores.push(checked32(parts.reduce((a,b)=>a+b,parameters.fc_bias[c])));contributions.push(parts);
  }
  let prediction=0;for(let c=1;c<scores.length;c++)if(scores[c]>scores[prediction])prediction=c;
  return {input,conv_acc,activation,relu,pool,flat,scores,prediction,contributions};
}
async function decodeCnnImage(uri) {
  if(typeof uri!=='string'||!uri.startsWith('data:image/'))throw Error('Format gambar tidak valid.');
  const image=new Image();image.src=uri;await image.decode();
  const width=image.naturalWidth,height=image.naturalHeight;
  if(width*height>16000000||Math.min(width,height)<2)throw Error('Gambar harus minimal 2×2 dan maksimal 16 megapixel.');
  const canvas=imageCanvas(width,height),ctx=canvas.getContext('2d',{willReadFrequently:true});
  ctx.fillStyle='white';ctx.fillRect(0,0,width,height);ctx.drawImage(image,0,0);
  const rgba=ctx.getImageData(0,0,width,height).data,gray=new Uint8Array(width*height);
  gray.forEach((_,i)=>{gray[i]=Math.floor((rgba[i*4]*19595+rgba[i*4+1]*38470+rgba[i*4+2]*7471+32768)/65536);});
  return {gray,width,height,original:canvas.toDataURL('image/png')};
}
function roadDemoUri() {
  const canvas=imageCanvas(180,180),ctx=canvas.getContext('2d');ctx.fillStyle='#ccd9df';ctx.fillRect(0,0,180,180);
  ctx.beginPath();for(let i=0;i<8;i++){const a=(i+.5)*Math.PI/4;const x=90+65*Math.cos(a),y=85+65*Math.sin(a);i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.closePath();ctx.fillStyle='#bf2525';ctx.fill();ctx.lineWidth=5;ctx.strokeStyle='white';ctx.stroke();ctx.fillStyle='white';ctx.font='bold 28px sans-serif';ctx.textAlign='center';ctx.fillText('STOP',90,94);
  return canvas.toDataURL('image/png');
}
async function cnnFetch(endpoint,options={}) {
  try {
    if(endpoint==='/api/model')return new Response(JSON.stringify(await loadCnnPackage()));
    if(endpoint==='/api/metrics')return fetch('./metrics.json');
    if(endpoint.startsWith('/api/sample?')) {
      const digit=Number(new URLSearchParams(endpoint.split('?')[1]).get('digit'));
      if(!Number.isInteger(digit)||digit<0||digit>9)throw Error('Digit harus 0–9.');
      const response=await fetch('./samples.json');if(!response.ok)throw Error('Contoh tidak dapat dimuat.');
      const data=await response.json();return new Response(JSON.stringify({image:grayUri(data.pixels[digit][0].flat(),28,28),label:digit,source:'MNIST validation'}));
    }
    if(endpoint==='/api/infer') {
      const payload=JSON.parse(options.body),pkg=await loadCnnPackage();
      let uri=payload.image;
      if(payload.demo) {
        if(pkg.contract.dataset==='MNIST') {const response=await cnnFetch('/api/sample?digit=0');uri=(await response.json()).image;}
        else uri=roadDemoUri();
      }
      const decoded=await decodeCnnImage(uri),prepared=prepareCnnImage(decoded.gray,decoded.width,decoded.height,pkg.contract,payload.roi);
      const trace=inferCnnInteger(prepared.pixels,pkg.parameters,pkg.contract);
      return new Response(JSON.stringify({...prepared,pixels:undefined,original:decoded.original,
        resized:grayUri(prepared.pixels,pkg.contract.image_size,pkg.contract.image_size),trace,demo:Boolean(payload.demo)}));
    }
    throw Error('Operasi tidak tersedia.');
  } catch(error) {return new Response(JSON.stringify({error:error.message}),{status:400});}
}
// Only pure arithmetic functions are exported for parity tests; pages use globals.
if(typeof module!=='undefined')module.exports={inferCnnInteger,resizeGray,roundEven,prepareCnnImage};
