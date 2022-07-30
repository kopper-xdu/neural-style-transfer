import {getImageTensorFromBuffer} from "./imageHelper.js";
import {runAdaINModel} from "./modelHelper.js";

const session = ort.InferenceSession
        .create('static/AdaIN.with_runtime_opt.ort',
            {executionProviders: ['wasm'], graphOptimizationLevel: 'all'});

export async function inference(imgPath1, imgPath2) {
    const imageTensor1 = await getImageTensorFromBuffer(imgPath1);
    const imageTensor2 = await getImageTensorFromBuffer(imgPath2);

    
    const [result, inferenceTime] = await runAdaINModel(session, imageTensor1, imageTensor2);
   
    return [result, inferenceTime];
}
