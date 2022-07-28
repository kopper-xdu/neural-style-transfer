import onnxruntime as ort
import numpy as np
from PIL import Image
import torch
from torchvision.utils import save_image

img1 = Image.open('input/content/avril.jpg')
img2 = Image.open('input/style/contrast_of_forms.jpg').resize(img1.size)

img1 = np.array(img1).astype(np.float32)/255
img2 = np.array(img2).astype(np.float32)/255

img1 = img1.transpose((2, 0, 1))
img2 = img2.transpose((2, 0, 1))
img1 = img1.reshape(1, 3, img1.shape[1], img1.shape[2])
img2 = img2.reshape(1, 3, img2.shape[1], img2.shape[2])

ort_session = ort.InferenceSession("AdaIN.onnx")


outputs = ort_session.run(
    None,
    {"input1": img1, "input2": img2}
)

a = torch.tensor(outputs[0])
save_image(a, 'output/result8.jpg')