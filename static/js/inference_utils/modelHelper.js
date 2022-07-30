export async function runAdaINModel(session1, preprocessedData1, preprocessedData2) {
    const session = await session1;
    console.log('Inference session created');

    let [results, inferenceTime] = await runInference(session, preprocessedData1, preprocessedData2);
    return [results, inferenceTime];
}


async function runInference(session, preprocessedData1, preprocessedData2) {
    const start = new Date();

    const feeds = {};
    feeds[session.inputNames[0]] = preprocessedData1;
    feeds[session.inputNames[1]] = preprocessedData2;

    const outputData = await session.run(feeds);

    const end = new Date();

    const inferenceTime = (end.getTime() - start.getTime()) / 1000;

    const output = outputData[session.outputNames[0]];

    return [output, inferenceTime];
}
