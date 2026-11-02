# Browser CNN projects

Standalone static projects for GitHub Pages (no Python server or build step).

- https://saufik.web.id/projects/ — project directory
- https://saufik.web.id/projects/mnist-cnn/ — MNIST drawing/upload visualizer
- https://saufik.web.id/projects/road-sign-cnn/ — GTSRB road-sign visualizer

Source GUI and model provenance: https://github.com/saufik-ramadhan/fpga_road_sign_cnn
(the local reference_model and mnist_digit packages). The exported model files
are complete integer parameters plus their numerical contracts; no checkpoint,
dataset cache, private files, or local Python environment is required here.

## Model evidence

- Road sign: p2-int-32-v1; 32×32, eight GTSRB classes. Float validation 97.21%,
  integer validation 97.32% on 2,760 images. Official test was not used.
- MNIST: mnist-int-v1; 28×28, ten digits. Float official test 97.34%, integer
  official test 97.28% on 10,000 images. Checkpoint selection used validation
  only and quantization calibration used training only.
- Road-sign validation and MNIST official-test accuracy are different evaluations;
  they should not be compared directly. Neither result measures arbitrary uploads.
- Diagram planes, nodes and edges are schematic; tensor sizes and inspectors
  follow the model. No RTL/board performance is claimed.

## Browser runtime

`shared/cnn-runtime.js` performs integer convolution, ReLU/requantization,
2×2 pooling, CHW flattening, FC and deterministic argmax. Rescale uses division
and floor instead of JavaScript's signed 32-bit shift operators. Every rescale
intermediate is checked against the exact JavaScript integer range, and
accumulators/scores are checked against int32 bounds.

Static `model.json`, `metrics.json` and MNIST `samples.json` replace the local API.
Relative URLs let the projects work under the custom domain or repository Pages.
Uploads and drawings remain in browser memory. Image decoding/EXIF uses the
browser; grayscale uses Pillow's RGB-to-L coefficients, and resizing uses its
separable bilinear kernel with 22-bit coefficients. Color management of unusual
image formats may still differ across browsers; inspect the prepared input.

MNIST supports black/white polarity, automatic foreground crop and center of mass,
while preformatted 28×28 MNIST inputs preserve their pixel arrays. Road-sign ROI
maximum coordinates are inclusive. A synthetic road-sign demo is illustrative,
not an accuracy benchmark. MNIST examples are labelled validation samples.

## Local preview and tests

From the repository root:

```sh
python -m http.server 5173
node projects/tests/parity.cjs
```

Open `/projects/`. The arithmetic test compares every intermediate layer and
all FC contributions to Python golden reference fixtures for both real model
packages. Resize cases cover upsampling, downsampling and nonsquare inputs.

Pushing these static files to the existing main branch publishes them through
the repository's GitHub Pages workflow. The portfolio profile and CV content
are separate and unchanged by these project pages.
