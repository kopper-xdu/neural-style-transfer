let contentImgUrls = ['static/content/avril.jpg',
    'static/content/blonde_girl.jpg',
    'static/content/brad_pitt.jpg',
    'static/content/chicago.jpg',
    'static/content/cornell.jpg',
    'static/content/flowers.jpg',
    'static/content/golden_gate.jpg',
    'static/content/lenna.jpg',
    'static/content/modern.jpg',
    'static/content/newyork.jpg',
    'static/content/sailboat.jpg',
    'static/content/1.jpg',
    'static/content/avril.jpg',
    'static/content/avril.jpg',
    'static/content/avril.jpg'];

let styleImgUrls = ['static/style/1.jpg',
    'static/style/antimonocromatismo.jpg',
    'static/style/asheville.jpg',
    'static/style/contrast_of_forms.jpg',
    'static/style/en_campo_gris.jpg',
    'static/style/flower_of_life.jpg',
    'static/style/goeritz.jpg',
    'static/style/impronte_d_artista.jpg',
    'static/style/la_muse.jpg',
    'static/style/picasso_seated_nude_hr.jpg',
    'static/style/mondrian.jpg',
    'static/style/scene_de_rue.jpg',
    'static/style/sketch.png',
    'static/style/the_resevoir_at_poitiers.jpg',
    'static/style/trial.jpg'];

let preLoads = ['static/style/1.jpg',
    'static/style/antimonocromatismo.jpg',
    'static/style/asheville.jpg',
    'static/style/contrast_of_forms.jpg',
    'static/style/en_campo_gris.jpg',
    'static/style/flower_of_life.jpg',
    'static/style/goeritz.jpg',
    'static/style/impronte_d_artista.jpg',
    'static/style/la_muse.jpg',
    'static/style/picasso_seated_nude_hr.jpg',
    'static/style/mondrian.jpg',
    'static/style/scene_de_rue.jpg',
    'static/style/sketch.png',
    'static/style/the_resevoir_at_poitiers.jpg',
    'static/style/trial.jpg',
    'static/AdaIN.with_runtime_opt.ort',
    'static/js/inference_utils/ort-wasm-simd.wasm'];

//预加载
let num = 0;
let list = [];
loadImage();

function loadImage() {
    let img = new Image();
    img.addEventListener("load", loadHandler);
    img.src = styleImgUrls[num];
}

function loadHandler(e) {
    list.push(this.cloneNode());//复制当前图片元素
    num++;
    if (num === styleImgUrls.length) {
        return;
    }
    this.src = styleImgUrls[num]; //修改地址继续后触发load事件
}
