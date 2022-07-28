export async function getImageTensorFromBuffer(path) {
    // 1. load the image
    let image = await loadImageFromBuffer(path);
    // 2. convert to tensor
    return imageDataToTensor(image);
}

async function loadImageFromBuffer(path) {
    // Use Jimp to load the image and resize it.
    let imageData = await Jimp.read(path).then((imageBuffer) => {
        let height = imageBuffer.bitmap.height
        let width = imageBuffer.bitmap.width
        const x = 575
        if (height >= width && height > x) {
            imageBuffer.scale(x / height)
        }
        else if (height < width && width > x) {
            imageBuffer.scale(x / width)
        }
        return imageBuffer;
    });
    return imageData;
}


function imageDataToTensor(image) {
    // 1. Get buffer data from image and create R, G, and B arrays.
    let imageBufferData = image.bitmap.data;
    let height = image.bitmap.height
    let width = image.bitmap.width

    const [redArray, greenArray, blueArray] = [new Array(0), new Array(0), new Array(0)];
    // 2. Loop through the image buffer and extract the R, G, and B channels
    for (let i = 0; i < imageBufferData.length; i += 4) {
        redArray.push(imageBufferData[i]);
        greenArray.push(imageBufferData[i + 1]);
        blueArray.push(imageBufferData[i + 2]);
        // skip data[i + 3] to filter out the alpha channel
    }

    // 3. Concatenate RGB to transpose [224, 224, 3] -> [3, 224, 224] to a number array
    const transposedData = redArray.concat(greenArray).concat(blueArray);
    // 4. convert to float32
    // create the Float32Array size 3 * 224 * 224 for these dimensions output
    const float32Data = new Float32Array(3 * height * width);
    for (let i = 0; i < transposedData.length; i++) {
        float32Data[i] = transposedData[i] / 255.0; // convert to float
    }
    // 5. create the tensor object from onnxruntime-web.
    return new ort.Tensor("float32", float32Data, [1, 3, height, width]);
}