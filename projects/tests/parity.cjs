const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {inferCnnInteger,resizeGray,prepareCnnImage}=require('../shared/cnn-runtime.js');
const root=path.resolve(__dirname,'..');
const fixtures=JSON.parse(fs.readFileSync(path.join(__dirname,'golden.json'),'utf8'));
let count=0;
for(const example of fixtures.inference) {
  const model=JSON.parse(fs.readFileSync(path.join(root,example.model,'model.json'),'utf8'));
  const output=inferCnnInteger(example.pixels,model.parameters,model.contract);
  for(const [stage,expected] of Object.entries(example.trace))assert.deepEqual(output[stage],expected,`${example.model}/${example.name}/${stage}`);
  count++;
}
for(const example of fixtures.resize) {
  assert.deepEqual(Array.from(resizeGray(Uint8Array.from(example.input),example.width,example.height,example.targetWidth,example.targetHeight)),example.output,`resize ${example.name}`);
  count++;
}
for(const example of fixtures.preprocess) {
  const output=prepareCnnImage(Uint8Array.from(example.input),example.width,example.height,{dataset:'MNIST'},null);
  assert.deepEqual(Array.from(output.pixels),example.output,`preprocess ${example.name}`);
  count++;
}
assert.throws(()=>inferCnnInteger([256],{}, {image_size:1}),/Input pixel/);
assert.throws(()=>prepareCnnImage(new Uint8Array(784),28,28,{dataset:'MNIST'},null),/Belum ada digit/);
console.log(`PASS: ${count} Python-golden parity cases; all layers, FC contributions, resizing and MNIST preprocessing agree.`);
