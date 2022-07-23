let uploadBtn = document.getElementById('upload');

uploadBtn.onclick = upLoad;

function upLoad(e) {
    // 点击上传后更改右列样式
    document.getElementById('wrapper2').style.display = 'none';
    document.querySelector('.wrapper > span').innerHTML = '生成的图片';
    e.target.innerHTML = '生成中...';
    e.target.disabled = 'true';

    // e.preventDefault();
    let formElement = document.querySelector('form');
    let formData = new FormData(formElement);

    let fileName1 = (new Date()).getTime() + "1"; //随机文件名
    let fileName2 = (new Date()).getTime() + "2"; //随机文件名
    let loadPic1 = document.getElementById('load-pic1');
    let loadPic2 = document.getElementById('load-pic2');
    let imgFile1 = convertBase64UrlToImgFile(loadPic1.src, fileName1, 'image/*'); //转换成File
    formData.append('content_image', imgFile1, fileName1);
    let imgFile2 = convertBase64UrlToImgFile(loadPic2.src, fileName2, 'image/*'); //转换成File
    formData.append('style_image', imgFile2, fileName2);

    let xhr = new XMLHttpRequest();
    xhr.responseType = 'arraybuffer'
    xhr.open('POST', 'http://kopper.top/processImage', true);
    // xhr.setRequestHeader('contentImage-type', 'multipart/form-data; boundary=-------111');
    // 不能重复设置content-type, 设置form元素属性即可
    xhr.onload = function (e) {
        if (this.status === 200) {
            // TODO 输入成功提示
            let imgUrl = 'data:image/jpeg;base64,' + String.fromCharCode(...new Uint8Array(xhr.response))
            let resImg = document.createElement('img')
            resImg.src = imgUrl
            let wrapper = document.querySelector('.wrapper');
            wrapper.appendChild(resImg);
        } else {
            //TODO
            alert('显存溢出，稍等一段时间再尝试')
        }
        uploadBtn.innerHTML = 'upload';
    }
    xhr.send(formData);
}

function convertBase64UrlToImgFile(urlData, fileName, fileType) {
    console.log(urlData);
    let bytes = atob(urlData.substring(urlData.indexOf(',') + 1)); //转换为byte
    //处理异常,将ascii码小于0的转换为大于0
    let ab = new ArrayBuffer(bytes.length);
    let ia = new Int8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    //转换成文件，添加文件的type，name，lastModifiedDate属性
    let blob = new Blob([ab], {type: fileType});
    blob.lastModifiedDate = new Date();
    blob.name = fileName;
    return blob;
}