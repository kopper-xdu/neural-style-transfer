export async function runAdaINModel(session1, preprocessedData1, preprocessedData2) {
<<<<<<< HEAD
    // Create session and set options.
=======
>>>>>>> 6d1877e657c49f6f12431dbef02859868d7a8089
    const session = await session1;
    console.log('Inference session created');
    
    let [results, inferenceTime] = await runInference(session, preprocessedData1, preprocessedData2);
    return [results, inferenceTime];
}

async function runInference(session, preprocessedData1, preprocessedData2)
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
