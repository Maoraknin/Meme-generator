'use strict'


let gCurrElImg
// let gCurrTextSize
let gElCanvas
let gCtx
let gIsPressed = false
let gStartPos

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function setMemeTxt() {
    const elInput = document.querySelector('#meme-text')
    const value = elInput.value
    setLineTxt(value)
    renderMeme(gCurrElImg)
}

function renderMeme(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    const meme = getMeme()
    if(meme.lines.length === 0) onAddTextLine()
    meme.lines.forEach(line => {
        drawText(line, line.x, line.y)
    });
    const line = getMemeLine()
    drawRect(line)
}

function renderMemeForExporting(img){
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    const meme = getMeme()
    meme.lines.forEach(line => {
        drawText(line, line.x, line.y)
    });
    const line = getMemeLine()
}



function setImg(elImg) {
    gCurrElImg = elImg
    gMeme.selectedImgId = elImg.id
}

function onAddTextLine() {
    const meme = getMeme()
    const line = addTextLine()
    meme.lines.push(line)
    meme.selectedLineIdx = meme.lines.length - 1
    const elInput = document.querySelector('#meme-text')
    elInput.value = ''
    renderMeme(gCurrElImg)
    document.querySelector('.second-row').classList.remove('active')
    document.querySelector('.first-row').classList.remove('active')
}

function onAddSticker(elSticker){
    const meme = getMeme()
    const sticker = elSticker.innerText
    const line = addStickerLine(sticker)
    meme.lines.push(line)
    renderMeme(gCurrElImg)
}



function renderTextColor() {
    gCtx.fillStyle = document.querySelector('input[name="fill-color"]').value
    gCtx.strokeStyle = document.querySelector('input[name="border-color"]').value
}

// function setTextSize(text, textHeight){
//     const textSize = {}
//     textSize.width = gCtx.measureText(text).width
//     textSize.height = textHeight
//     gCurrTextSize = textSize
// }

// function getTextSize(){
//     return gCurrTextSize
// }

function drawText(line, x, y) {
    gCtx.textAlign = line.align
    gCtx.lineWidth = 2
    gCtx.font = line.size + "px " + line.style
    const text = line.txt
    gCtx.textBaseline = line.baseLine
    line.width = gCtx.measureText(text).width
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y) 
}


function getTextWidth(){
    return gCtx.measureText(text).width
}


function onSwitchLine() {
    const meme = getMeme()
    switchLine()
    renderCurrLine(meme, meme.selectedLineIdx)
    const line = getMemeLine()
    drawRect(line)
}

function renderCurrLine(meme, idx){
    if (idx === 0) {
        document.querySelector('.first-row').classList.add('active')
        document.querySelector('.second-row').classList.remove('active')
    } else if (idx === 1) {
        document.querySelector('.second-row').classList.add('active')
        document.querySelector('.first-row').classList.remove('active')
    } else {
        document.querySelector('.second-row').classList.remove('active')
        document.querySelector('.first-row').classList.remove('active')
    }
    const elInput = document.querySelector('#meme-text')
    elInput.value = meme.lines[idx].txt
}

function onChangeFontFamily(value) {
    changeFontFamily(value)
    renderMeme(gCurrElImg)
}

function onClearLine() {
    const elInput = document.querySelector('#meme-text')
    elInput.value = ''
    clearLine()
    renderMeme(gCurrElImg)
}


function onChangeFontSize(value) {
    const line = getMemeLine()
    line.size += value
    renderMeme(gCurrElImg)
}




function onSetAlignItems(value) {
    setAlignItems(value)
    renderMeme(gCurrElImg)

}

function renderImgFromUser(img) {
    gCurrElImg = img
    resizeCanvas(img)
    renderMeme(gCurrElImg)
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImgFromUser)
}


function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = (event) => {
        let img = new Image() // Create a new html img element
        img.src = event.target.result
        img.onload = () => onImageReady(img)
    }

    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked

}



function onDown(ev) {
    const meme = getMeme()
    const pos = getEvPos(ev)
    const idx = getTextClickedIdx(pos)
    console.log(idx);
    if (idx === -1) return
    meme.selectedLineIdx = idx
    renderCurrLine(meme, idx)
    setTextDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const isDrag = isTextDrag()
    if (!isDrag) return

    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y

    moveText(dx, dy)
    renderMeme(gCurrElImg)
    gStartPos = pos
}




function onUp() {
    setTextDrag(false)
    document.body.style.cursor = 'default'
}

function getEvPos(ev) {
    const line = getMemeLine()
    let diff = 0
    if(line.align === 'left') diff = 0
    if(line.align === 'center') diff = line.width / 2
    if(line.align === 'right') diff = line.width
    let pos = {
        x: ev.offsetX + diff,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft + diff,
            y: ev.pageY - ev.target.offsetParent.offsetTop - ev.target.clientTop,
        }
        console.log(pos);
    }
    return pos
}


function getMemeLine() {
    const meme = getMeme()
    const lineIdx = meme.selectedLineIdx
    const line = meme.lines[lineIdx]
    return line
}

function setBorderColor(value) {
    // const line = getMemeLine()
    gCtx.strokeStyle = value
    renderMeme(gCurrElImg)
}


function setFillColor(value) {
    // const line = getMemeLine()
    gCtx.fillStyle = value
    renderMeme(gCurrElImg)
}


// DOWNLOAD CANVAS

function downloadCanvas(elLink) {
    renderMemeForExporting(gCurrElImg)
    const canvasContent = gElCanvas.toDataURL('canvas/jpeg')
    elLink.href = canvasContent
}

// FACEBOOK SHARE

function onUploadImg() {
    renderMemeForExporting(gCurrElImg)
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    doUploadImg(imgDataUrl, onSuccess)
}


function drawRect(line) {
    const meme = getMeme()
    if(meme.lines.length === 0 ||line.width === 0) return
    let y
    if(line.baseLine === 'top') y = line.y
    else if(line.baseLine === 'middle') y = line.y - line.size / 2
    else if(line.baseLine === 'bottom') y = line.y - line.size
    let x
    if(line.align === 'left') x = line.x
    else if(line.align === 'center') x = line.x - line.width / 2
    else if(line.align === 'right') x = line.x - line.width
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(x, y, line.width, line.size)
}





