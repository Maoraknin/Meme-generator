'use strict'


function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    createImgs()
    creategMeme()
    renderGallery()
    addMouseListeners()
    addTouchListeners()
    document.querySelector('#meme-text').addEventListener("keyup", setMemeTxt, true);

    gCtx.fillStyle = document.querySelector('input[name="fill-color"]').value
    gCtx.strokeStyle = document.querySelector('input[name="border-color"]').value
}

function renderGallery(){
    const imgs = getImgs()
    let strHtml = ''
    imgs.map(img => {
        strHtml += `<a href="#"><img class="gallery-img" id="${img.id}" onclick="onImgSelect(this)" src="${img.url}"></a>`
    })
    let elDiv = document.querySelector('.img-container')
    elDiv.innerHTML = strHtml
}

function onImgSelect(elImg){
    openMemeLab()
    setImg(elImg)
    renderMeme(elImg)
}

function openMemeLab(){
    document.querySelector('.meme-lab').hidden = false
}

function closeMemeLab(){
    document.querySelector('.meme-lab').hidden = true
}