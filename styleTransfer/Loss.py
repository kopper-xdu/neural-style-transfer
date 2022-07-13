import torch
from torch import nn
import torch.nn.functional as F
from torch import Tensor


class ContentLoss(nn.Module):
    def __init__(self, target):
        super().__init__()
        self.target = target.detach()

    def forward(self, input: Tensor):
        self.loss = F.mse_loss(input, self.target)
        return input


class StyleLoss(nn.Module):
    def __init__(self, target):
        super().__init__()
        self.target = gram_matrix(target).detach()

    def forward(self, input):
        G = gram_matrix(input)
        self.loss = F.mse_loss(G, self.target)
        return input


def gram_matrix(input: Tensor):
    a, b, c, d = input.size()
    features = input.reshape(a * b, c * d)
    G = torch.mm(features, features.transpose(0, 1))
    return G.div(a * b * c * d)
