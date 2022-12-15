'use strict'


function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    createImgs()
    renderGallery()
    addListeners()
    document.querySelector('#meme-text').addEventListener("keyup", setMemeTxt, true);
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

function resizeCanvas() {
    const elCanvas = document.getElementById('my-canvas')
    gElCanvas.width = elCanvas.offsetWidth
    gElCanvas.height = elCanvas.offsetHeight
    gElCanvas = document.getElementById('my-canvas')
    gCtx.fillStyle = document.querySelector('input[name="fill-color"]').value
    gCtx.strokeStyle = document.querySelector('input[name="border-color"]').value
    creategMeme()
}

function onImgSelect(elImg){
    openMemeLab()
    resizeCanvas()
    setImg(elImg)
    renderMeme(elImg)
    
}

function openMemeLab(){
    document.querySelector('.meme-lab').hidden = false
}

function closeMemeLab(){
    document.querySelector('.meme-lab').hidden = true
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    elContainer.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    elContainer.addEventListener('touchend', onUp)
}