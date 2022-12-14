'use strict'


function renderGallery(){
    const imgs = getImgs()
    console.log(imgs);
    let strHtml = ''
    imgs.map(img => {
        strHtml += `<img id="${img.id}" onclick="onImgSelect(this)" src="${img.url}">`
    })
    let elDiv = document.querySelector('.img-container')
    elDiv.innerHTML = strHtml
}

function onImgSelect(elImg){
    setImg(elImg)
    renderMeme()
}