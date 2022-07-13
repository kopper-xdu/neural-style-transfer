let imageInput1 = document.getElementById('image1');
let imageInput2 = document.getElementById('image2');
let uploadBtn = document.getElementById('upload');

imageInput1.addEventListener('change', handleFiles);
imageInput2.addEventListener('change', handleFiles);
uploadBtn.onclick = upLoad;

//TODO 使用隐藏的label触发上传，以美化html

function handleFiles() {
    const file = this.files[0];
    if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
        alert('请上传png/jpg/jpeg格式的图片！');
        return;
    }
    let img = document.createElement('img');
    let reader = new FileReader();
    reader.onload = function (e) {
        img.src = e.target.result;
        img.width = 300;
    }
    reader.readAsDataURL(file);
    let divId = this.id === 'image1' ? 'img1' : 'img2';
    document.getElementById(divId).appendChild(img);
}

function upLoad(e) {
    e.preventDefault();
    let formElement = document.querySelector('form');
    let formData = new FormData(formElement);
    let images = [formData.get('content_image'), formData.get('style_image')];
    //TODO
    if (images.length !== 2) {
        alert('请选择两张图片！');
        return;
    }
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'arraybuffer'
    xhr.open('POST', 'http://120.26.77.50/processImage', true);
    // xhr.setRequestHeader('contentImage-type', 'multipart/form-data; boundary=-------111');
    // 不能重复设置content-type, 设置form元素属性即可
    xhr.onload = function (e) {
        if (this.status === 200) {
            // TODO 输入成功提示
            let imgUrl = 'data:image/jpeg;base64,' + String.fromCharCode(...new Uint8Array(xhr.response))
            console.log(imgUrl)
            let resImg = document.createElement('img')
            resImg.src = imgUrl
            document.querySelector('.res-img').appendChild(resImg)
        } else {
            //TODO
            alert('sdd')
        }
    }
    xhr.send(formData);
}