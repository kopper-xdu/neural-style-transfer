async function inference(imgPath1, imgPath2) {
    // 1. Convert image to tensor
    const imageTensor1 = await getImageTensorFromBuffer(imgPath1);
    const imageTensor2 = await getImageTensorFromBuffer(imgPath2);

    // 2. Run model
    const [result, inferenceTime] = await runAdaINModel(imageTensor1, imageTensor2);
    // 3. Return predictions and the amount of time it took to inference_utils.
    return [result, inferenceTime];
}


async function getImageTensorFromBuffer(path, dims = [1, 3, 512, 512]) {
    // 1. load the image
    let image = await loadImageFromBuffer(path, dims[2], dims[3]);
    // 2. convert to tensor
    return imageDataToTensor(image, dims);
}

async function loadImageFromBuffer(path, width, height) {
    // Use Jimp to load the image and resize it.
    let imageData = await Jimp.read(path).then((imageBuffer) => {
        return imageBuffer.resize(width, height);
    });
    return imageData;
}


function imageDataToTensor(image, dims) {
    // 1. Get buffer data from image and create R, G, and B arrays.
    let imageBufferData = image.bitmap.data;
    console.log(imageBufferData);
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
    const float32Data = new Float32Array(dims[1] * dims[2] * dims[3]);
    for (i = 0; i < transposedData.length; i++) {
        float32Data[i] = transposedData[i] / 255.0; // convert to float
    }
    // 5. create the tensor object from onnxruntime-web.
    return new ort.Tensor("float32", float32Data, dims);
}

async function runAdaINModel(preprocessedData1, preprocessedData2) {
    // Create session and set options. See the docs here for more options:
    //https://onnxruntime.ai/docs/api/js/interfaces/InferenceSession.SessionOptions.html#graphOptimizationLevel
    const session = await ort.InferenceSession
        .create('static/AdaIN.onnx',
            {executionProviders: ['wasm'], graphOptimizationLevel: 'all'});
    console.log('Inference session created');
    // Run inference_utils and get results.
    let [results, inferenceTime] = await runInference(session, preprocessedData1, preprocessedData2);
    return [results, inferenceTime];
}

async function runInference(session, preprocessedData1, preprocessedData2) {
    // Get start time to calculate inference_utils time.
    const start = new Date();
    // create feeds with the input name from model export and the preprocessed data.
    const feeds = {};
    feeds[session.inputNames[0]] = preprocessedData1;
    feeds[session.inputNames[1]] = preprocessedData2;
    // Run the session inference_utils.
    const outputData = await session.run(feeds);
    // Get the end time to calculate inference_utils time.
    const end = new Date();
    // Convert to seconds.
    const inferenceTime = (end.getTime() - start.getTime()) / 1000;
    // Get output results with the output name from the model export.
    const output = outputData[session.outputNames[0]];
    // console.log(inferenceTime);
    return [output, inferenceTime];
}