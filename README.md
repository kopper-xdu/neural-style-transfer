# Style Transfer Online With Onnx Runtime

## Introduction

This repository is a web project built by the Python Flask framework that allows users to play with style transfer algorithms online. The core model of the project adopts the AdaIN model, which can transfer any style, and the inference process of this model is done in the frontend by js, relying on onnx runtime to build neural network models.

<img src="static\example\architecture.jpg" style="zoom: 50%;" />

looking [AdaIN](https://github.com/xunhuang1995/AdaIN-style), [onnxruntime](https://onnxruntime.ai/) for more information

## Playground Online

[Style Transfer Online](https://kopper-xdu.github.io/neural-style-transfer/)

(Please use the latest version of Edge or Google Chrome to access)

## Deployment

#### Usage:

```python
pip install flask
python app.py
```

## Example
<img src="static\example\index.png" style="zoom: 50%;" />
    
<img src="static\example\try.png" style="zoom:50%; margain-top: 10px;" />

## Reference

- [Arbitrary style transfer using TensorFlow.js (github.com)](https://github.com/reiinakano/arbitrary-image-stylization-tfjs)
- [ :pencil2: Neural Style Transfer: A Review (github.com)](https://github.com/ycjing/Neural-Style-Transfer-Papers)
- [Make PyTorch fast-neural-style to run inference with ONNX.js in web browsers (github.com)](https://github.com/gnsmrky/pytorch-fast-neural-style-for-web)
- [Unofficial pytorch implementation of 'Arbitrary Style Transfer in Real-time with Adaptive Instance Normalization'(github.com)](https://github.com/naoto0804/pytorch-AdaIN)
