import os
import sys

sys.path.append(os.path.dirname(__file__))

from utils import *
from torchvision import models


def run(style_img_pth, content_img_pth, save_pth):
    style_img = image_loader(style_img_pth)
    content_img = image_loader(content_img_pth)

    cnn_normalization_mean = torch.tensor([0.485, 0.456, 0.406]).to(device)
    cnn_normalization_std = torch.tensor([0.229, 0.224, 0.225]).to(device)

    cnn = models.vgg19(pretrained=True).features.to(device).eval()

    input_img = content_img.clone()

    output = run_style_transfer(cnn, cnn_normalization_mean, cnn_normalization_std, content_img, style_img, input_img)

    img_save(output, save_path=save_pth)


if __name__ == '__main__':
    run('../static/styleImage/style2.jpg',
        '../static/contentImage/content2.jpg',
        '../static/result/result.jpg')
