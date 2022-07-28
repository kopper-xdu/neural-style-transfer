let loadPic1 = document.getElementById('load-pic1');
let loadPic2 = document.getElementById('load-pic2');
let imageInput1 = document.getElementById('image1');
let imageInput2 = document.getElementById('image2');

loadPic1.onclick = changeRightContent;
loadPic2.onclick = changeRightContent;

imageInput1.addEventListener('change', handleFiles);
imageInput2.addEventListener('change', handleFiles);

for (let i = 0; i < exampleImgs.length; ++i) {
    exampleImgs[i].onclick = showExampleImg;
}

function showExampleImg(e) {
    let rightContent = document.querySelector('.wrapper');
    if (rightContent.id === 'wrapper-for-content') {
        let loadPic1 = document.getElementById('load-pic1');
        loadPic1.src = e.target.src;
    } else {
        let loadPic2 = document.getElementById('load-pic2');
        loadPic2.src = e.target.src;
    }
    // 判断upload是否可以解锁
    if (loadPic1.src.slice(-3) !== 'png' && loadPic2.src.slice(-3) !== 'png') {
        document.getElementById('upload').disabled = "";
    }
}

function changeRightContent(e) {
    let rightContent = document.querySelector('.wrapper');
    let description = document.querySelector('.wrapper span');
    let imgContainer1 = document.getElementById('img1');
    let imgContainer2 = document.getElementById('img2');
    let upLoadLabel = document.querySelector('.example-img-container label');
    let exampleImgs = document.querySelectorAll('.example-img');

    let larger = '82%';
    let smaller = '72%';

    if (e.target.id === 'load-pic1' && rightContent.id === 'wrapper-for-style') {
        rightContent.id = 'wrapper-for-content';
        description.innerHTML = '选择内容图片';

        imgContainer1.classList.add('img-with-border');
        imgContainer2.classList.remove('img-with-border');

        e.target.style.width = smaller;
        e.target.style.height = smaller;
        loadPic2.style.width = larger;
        loadPic2.style.height = larger;

        upLoadLabel.setAttribute('for', 'image1');

        for (let i = 0; i < exampleImgs.length; ++i) {
            exampleImgs[i].src = contentImgUrls[i];
        }
    } else if (e.target.id === 'load-pic2' && rightContent.id === 'wrapper-for-content') {
        rightContent.id = 'wrapper-for-style';
        description.innerHTML = '选择风格图片';
        imgContainer2.classList.add('img-with-border');
        imgContainer1.classList.remove('img-with-border');

        e.target.style.width = smaller;
        e.target.style.height = smaller;
        loadPic1.style.width = larger;
        loadPic1.style.height = larger;

        upLoadLabel.setAttribute('for', 'image2');

        for (let i = 0; i < exampleImgs.length; ++i) {
            exampleImgs[i].src = styleImgUrls[i];
        }
    }
}

function handleFiles(e) {
    const file = this.files[0];
    if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/bmp') {
        alert('请上传png/jpg/jpeg格式的图片！');
        //return; //TODO
    }

    let loadPic = e.target.id === 'image1' ?
        document.getElementById('load-pic1') :
        document.getElementById('load-pic2');

    function f(e) {
        //转换为base64
        loadPic.src = e.target.result;
        loadPic.width = '10';
        if (loadPic1.src.slice(-3) !== 'png' && loadPic2.src.slice(-3) !== 'png') {
            document.getElementById('upload').disabled = "";
        }
    }

    let reader = new FileReader();
    reader.onload = f;
    reader.readAsDataURL(file);
    // 判断upload是否可以解锁
}


