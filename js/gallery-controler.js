'use strict'



function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    createSavedMemes()
    createImgs()
    renderGallery()
    addListeners()
    document.querySelector('#meme-text').addEventListener("keyup", setMemeTxt, true);
}

function renderGallery(){
    const imgs = getImgs()
    let strHtml = '<label for="upload-file" href="#"><img class="gallery-img" src="img/add-img.png"></label>'
    imgs.map(img => {
        strHtml += `<a href="#"><img class="gallery-img" id="${img.id}" onclick="onImgSelect(this)" src="${img.url}"></a>`
    })
    let elDiv = document.querySelector('.img-container')
    elDiv.innerHTML = strHtml
}

function renderGalleryBySearch(elInput){
    const value = elInput.value.toLowerCase()
    // elInput.value = ''
    if(value === '') renderGallery()
    else{
        const imgs = getImgs()
        let strHtml = '<label for="upload-file" href="#"><img class="gallery-img" src="img/add-img.png"></label>'
        const newImgs = imgs.filter(img => img.keywords.some(key => key.startsWith(value)))
        newImgs.map(img => {
            strHtml += `<a href="#"><img class="gallery-img" id="${img.id}" onclick="onImgSelect(this)" src="${img.url}"></a>`
        })
        let elDiv = document.querySelector('.img-container')
        elDiv.innerHTML = strHtml
    }
}

// console.log('gCurrElImg.naturalWidth:',gCurrElImg.naturalWidth)
// console.log('gCurrElImg.naturalHeight:',gCurrElImg.naturalHeight)
function resizeCanvas(elImg) {
    const elCanvas = document.getElementById('my-canvas')
    gElCanvas.width = elCanvas.offsetWidth
    gElCanvas.height = (elImg.naturalHeight * gElCanvas.width) / elImg.naturalWidth
    gElCanvas = document.getElementById('my-canvas')
    gCtx.fillStyle = document.querySelector('input[name="fill-color"]').value
    gCtx.strokeStyle = document.querySelector('input[name="border-color"]').value
}

function onImgSelect(elImg){
    openMemeLab()
    resizeCanvas(elImg)
    creategMeme()
    setImg(elImg)
    renderMeme(elImg)
    const elInput = document.querySelector('#meme-text')
    elInput.value = ''
    
}

function onSavedMemeSelect(idx){
    openMemeLab()
    setSavedgMeme(idx)
    const meme = getMeme()
    setCurrElImg(meme)
    setImg(gCurrElImg)
    resizeCanvas(gCurrElImg)
    renderMeme(gCurrElImg)
    const elInput = document.querySelector('#meme-text')
    elInput.value = ''
    
}

function renderSavedMemes(){
    const savedMemes = getSavedMemes()
    let strHtml = ''
    savedMemes.map((img, idx) => {
        strHtml += `<a href="#"><img class="gallery-img" onclick="onSavedMemeSelect(${idx})" src="${img}"></a>`
    })
    let elDiv = document.querySelector('.meme-imgs-container')
    elDiv.innerHTML = strHtml
}

function onShowSaveMemes(){
    document.querySelector('.memes').classList.add('active')
    document.querySelector('.gallery').classList.remove('active')
    document.querySelector('.about').classList.remove('active')
    document.querySelector('.meme-lab').hidden = true
    document.querySelector('.gallery-container').hidden = true
    document.querySelector('.saved-memes-container').hidden = false
    renderSavedMemes()

}

function onShowGallery(){
    document.querySelector('.gallery').classList.add('active')
    document.querySelector('.memes').classList.remove('active')
    document.querySelector('.about').classList.remove('active')
    document.querySelector('.meme-lab').hidden = true
    document.querySelector('.gallery-container').hidden = false
    document.querySelector('.saved-memes-container').hidden = true

}

function onAddMemeToSaved(){
    renderMemeForExporting(gCurrElImg)
    addSavedMeme(gElCanvas)
    onShowSaveMemes()
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