# Style Transfer Online With Onnx Runtime

## Introduction

这个仓库是一个由python flask框架建成的web项目，用户能够在线的尝试风格迁移算法。项目的核心功能采用 AdaIN 模型，它可以完成任意风格的迁移，并且该项目的推理计算都在前端完成，依赖onnx runtime在前端搭建神经网络模型。 

<img src="static\example\architecture.jpg" style="zoom: 50%;" />

查看 [AdaIN](https://github.com/xunhuang1995/AdaIN-style)， [onnxruntime ](https://onnxruntime.ai/)获取更多信息。

## Playground Online

[神经风格迁移在线网站](https://kopper.top)

（请使用最新版本的edge或谷歌浏览器访问）

## Deployment

#### Usage:

首先clone该项目：
```bash
git clone https://github.com/kopper-xdu/style-transfer.git
```

您需要安装flask框架： 
```python
pip install flask
```

然后您可以直接运行该项目：
```python
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
