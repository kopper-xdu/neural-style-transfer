export async function runAdaINModel(session1, preprocessedData1, preprocessedData2) {
    const session = await session1;
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
