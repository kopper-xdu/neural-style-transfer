import {getImageTensorFromBuffer} from "./imageHelper.js";
import {runAdaINModel} from "./modelHelper.js";

//预加载
async function preload() {
    const start = new Date();
    const session = await ort.InferenceSession
        .create('static/AdaIN.with_runtime_opt.ort',
            {executionProviders: ['wasm'], graphOptimizationLevel: 'all'});
    const end = new Date();
    const time = (end.getTime() - start.getTime()) / 1000;
    console.log('load model: ', time, 's');
    return session
}

const session = preload()

export async function inference(imgPath1, imgPath2) {
    const imageTensor1 = await getImageTensorFromBuffer(imgPath1);
    const imageTensor2 = await getImageTensorFromBuffer(imgPath2);

    
    const [result, inferenceTime] = await runAdaINModel(session, imageTensor1, imageTensor2);
   
    return [result, inferenceTime];
}
