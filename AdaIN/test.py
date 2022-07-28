import numpy as np
import torch
import torch.nn as nn
from PIL import Image
from torchvision import transforms
from torchvision.utils import save_image
import os
import sys

sys.path.append(os.path.dirname(__file__))
import net
from function import adaptive_instance_normalization


def test_transform(size, crop):
    transform_list = []
    # if size != 0:
    #     transform_list.append(transforms.Resize(size))
    if crop:
        transform_list.append(transforms.CenterCrop(size))
    transform_list.append(transforms.ToTensor())
    # TODO
    transform = transforms.Compose(transform_list)
    return transform


def style_transfer(vgg, decoder, content, style, alpha=1.0,
                   interpolation_weights=None):
    assert (0.0 <= alpha <= 1.0)
    content_f = vgg(content)
    style_f = vgg(style)

    feat = adaptive_instance_normalization(content_f, style_f)
    feat = feat * alpha + content_f * (1 - alpha)
    return decoder(feat)


def main(content_pth='./input/content/custom.jpg',
         style_pth='./input/style/custom.jpg',
         content_size=512, style_size=512,
         alpha=1.0, crop=False, device='cuda'):
    save_ext = '.jpg'
    output_dir = 'output'
    vgg_pth = 'models/vgg_normalised.pth'
    decoder_pth = 'models/decoder.pth'

    decoder = net.decoder
    vgg = net.vgg
    decoder.eval()
    vgg.eval()
    decoder.load_state_dict(torch.load(decoder_pth))
    vgg.load_state_dict(torch.load(vgg_pth))
    vgg = nn.Sequential(*list(vgg.children())[:31])
    vgg.to(device)
    decoder.to(device)

    content_tf = test_transform(content_size, crop)
    style_tf = test_transform(style_size, crop)

    content = content_tf(Image.open(content_pth))
    style = style_tf(Image.open(style_pth))

    style = style.to(device).unsqueeze(0)
    content = content.to(device).unsqueeze(0)

    with torch.no_grad():
        output = style_transfer(vgg, decoder, content, style, alpha)
    output = output.cpu()

    output_name = f'{output_dir}/result{save_ext}'
    save_image(output, output_name)


class AdaIN(nn.Module):
    def __init__(self, vgg, decoder):
        super(AdaIN, self).__init__()
        self.vgg = vgg
        self.decoder = decoder

    def forward(self, content, style, alpha=1):
        """
        :param content: shape:(1, 3, 512, 512)
        :param style: shape:(1, 3, 512, 512)
        """

        content_f = self.vgg(content)
        style_f = self.vgg(style)
        feat = adaptive_instance_normalization(content_f, style_f)
        feat = feat * alpha + content_f * (1 - alpha)
        return self.decoder(feat)


if __name__ == '__main__':
    vgg_pth = 'models/vgg_normalised.pth'
    decoder_pth = 'models/decoder.pth'
    decoder = net.decoder
    vgg = net.vgg
    decoder.eval()
    vgg.eval()
    decoder.load_state_dict(torch.load(decoder_pth))
    vgg.load_state_dict(torch.load(vgg_pth))
    vgg = nn.Sequential(*list(vgg.children())[:31])
    model = AdaIN(vgg, decoder)
    model.eval()
    torch.onnx.export(model,
                      (torch.randn(1, 3, 512, 512), torch.randn(1, 3, 512, 512)),
                      'AdaIN.onnx',
                      verbose=True,
                      input_names=["input1", "input2"],
                      output_names=["output"],
                      dynamic_axes={'input1': [2, 3], 'input2': [2, 3]},
                      opset_version=13)
    # main()
