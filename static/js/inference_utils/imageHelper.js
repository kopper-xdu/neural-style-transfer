import * as Jimp from './jimp.min.js';
import * as ort from './ort.min.js';

async function getImageTensorFromBuffer(buffer, dims=[1, 3, 512, 512]) {
  // 1. load the image
  let image = await loadImageFromBuffer(buffer, dims[2], dims[3]);
  // 2. convert to tensor
  let imageTensor = imageDataToTensor(image, dims);
  // 3. return the tensor
  return imageTensor;
}

async function loadImageFromBuffer(buffer, width=512, height=512) {
 // Use Jimp to load the image and resize it.
  let imageData = await Jimp.default.read('https://i.imgur.com/CzXTtJV.jpg').then(imageBuffer => {
    return imageBuffer.resize(width, height);
    console.log('aaa');
  });
  // console.log(buffer);
  // console.log(Jimp.read('../../contentImage/content1.jpg'));

  return imageData;
}


function imageDataToTensor(image, dims) {
  // 1. Get buffer data from image and create R, G, and B arrays.
  var imageBufferData = image.bitmap.data;
  const [redArray, greenArray, blueArray] = new Array(new Array<number>(0), new Array<number>(0), new Array<number>(0));
  // 2. Loop through the image buffer and extract the R, G, and B channels
  for (let i = 0; i < imageBufferData.length; i += 4) {
    redArray.push(imageBufferData[i]);
    greenArray.push(imageBufferData[i + 1]);
    blueArray.push(imageBufferData[i + 2]);
    // skip data[i + 3] to filter out the alpha channel TODO
  }

  // 3. Concatenate RGB to transpose [224, 224, 3] -> [3, 224, 224] to a number array
  const transposedData = redArray.concat(greenArray).concat(blueArray);

  // 4. convert to float32
  let i, l = transposedData.length; // length, we need this for the loop
  // create the Float32Array size 3 * 224 * 224 for these dimensions output
  const float32Data = new Float32Array(dims[1] * dims[2] * dims[3]);
  for (i = 0; i < l; i++) {
    float32Data[i] = transposedData[i] / 255.0; // convert to float
  }
  // 5. create the tensor object from onnxruntime-web.
  return new ort.Tensor("float32", float32Data, dims);
}