'use strict'


function renderGallery(){
    const imgs = getImgs()
    let strHtml = ''
    imgs.map(img => {
        strHtml += `<img class="gallery-img" id="${img.id}" onclick="onImgSelect(this)" src="${img.url}">`
    })
    let elDiv = document.querySelector('.img-container')
    elDiv.innerHTML = strHtml
}

function onImgSelect(elImg){
    setImg(elImg)
    renderMeme()
}