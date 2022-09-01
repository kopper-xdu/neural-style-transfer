## 项目四 基于AdaIN模型的图像风格迁移系统

项目完成人：XiJun Wang                联系方式：wangxijun@stu.xidian.edu.cn                开源、访问链接： 

[kopper-xdu/neural-style-transfer (github.com)](https://github.com/kopper-xdu/neural-style-transfer)    [在线演示](https://kopper.top)

### 项目背景和项目特点

人工智能的发展改变了社会的方方面面，其中艺术领域同样发生这变化。Gatys 等人的研究证实了卷积神经网络（CNN）的力量：通过分离和重新组合图片内容与风格，CNN 可以创作出具有艺术魅力的作品。自此，神经风格迁移成为了一个很受欢迎的主题，日益受到计算机视觉研究者的关注。所谓风格迁移，其实就是提供一幅画(Reference style image)，将任意一张照片转化成这个风格，并尽量保留原照的内容(Content)。我们开发了一款能够在线使用的风格迁移产品，方便用户了解风格迁移并探索其功能。

### 使用说明（分点描述主要功能，如何操作等）

本产品基本Web部署，拥有对用户十分友好的图形化界面，并具有较快的推理速度（15s左右），并支持用户自定义风格与内容图像。

<img src="https://cdn.jsdelivr.net/gh/kopper-xdu/neural-style-transfer/static/example/index.png" style="zoom: 50%;" />

### 项目技术路线（基于什么、模型框架、实验设置和实验分析等）

本项目基于Flask框架搭建，主要功能由onnx runtime web框架实现，利用用户端的算力，实现前端实时推理，减少后端服务器压力。风格迁移算法使用AdaIN模型，其最大优点是能够支持任意的图像风格迁移，并且推理速度快。

<img src="https://cdn.jsdelivr.net/gh/kopper-xdu/neural-style-transfer/static/example/architecture.jpg" style="zoom: 33%;" />

## 项目展望

日后可添加更多风格迁移算法，如实时的人脸动漫化，可调节的风格化程度等。