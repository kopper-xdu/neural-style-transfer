// import {inference} from "./inference_utils/generate.js";
let uploadBtn = document.getElementById('upload');

uploadBtn.onclick = upLoad;

async function upLoad(e) {
    // 点击上传后更改右列样式
    document.getElementById('wrapper2').style.display = 'none';
    document.querySelector('.wrapper > span').innerHTML = '生成的图片';
    e.target.innerHTML = '生成中...';
    e.target.disabled = 'true';

    let loadPic1 = document.getElementById('load-pic1');
    let loadPic2 = document.getElementById('load-pic2');

    //推理并显示结果
    let [result, inferenceTime] = await inference(loadPic1.src, loadPic2.src);

    console.log(inferenceTime);

    for (let i = 0; i < result.data.length; i++) {
        if (result.data[i] > 1) {
            result.data[i] = 1;
        } else if (result.data[i] < 0) {
            result.data[i] = 0;
        }
        result.data[i] = result.data[i] * 255;
    }
    tensorToCanvas(result, 'res-img');
}


function tensorToCanvas (tensor, canvasId) {
  const h = tensor.dims[2];
  const w = tensor.dims[3];
  var t_data = tensor.data;

  t_idx_r = 0;
  t_idx_g = t_idx_r + (h*w);
  t_idx_b = t_idx_g + (h*w);

  let canvas = document.getElementById(canvasId);
  canvas.style.display = 'block';
  var dst_ctx = canvas.getContext("2d");

  var dst_ctx_imgData = dst_ctx.getImageData(0, 0, w, h);
  var dst_ctx_data = dst_ctx_imgData.data;

  dst_idx = 0;
  for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      r = t_data[t_idx_r++];
      g = t_data[t_idx_g++];
      b = t_data[t_idx_b++];

      dst_ctx_data[dst_idx++]=r;
      dst_ctx_data[dst_idx++]=g;
      dst_ctx_data[dst_idx++]=b;
      dst_ctx_data[dst_idx++]=0xFF;
    }
  }

  dst_ctx.putImageData(dst_ctx_imgData, 0, 0);
}