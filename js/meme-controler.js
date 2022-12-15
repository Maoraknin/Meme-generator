'use strict'


let gCurrElImg

let gElCanvas
let gCtx
let gIsPressed = false

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function setMemeTxt() {
    const elInput = document.querySelector('#meme-text')
    const value = elInput.value
    console.log('value:', value)
    // elInput.value = ''
    // const meme = getMeme()
    setLineTxt(value)
    renderMeme(gCurrElImg)
}

function renderMeme(img) {
    console.log(img);
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    const meme = getMeme()
    drawText(meme.lines[0], 'top')
    drawText(meme.lines[1], 'bottom')
    // meme.lines.map(line =>{
    //     drawText(meme,line)
    //     meme.selectedLineIdx++
    //     if(meme.selectedLineIdx === meme.lines.length) meme.selectedLineIdx = 0
    // })    
    // console.log(meme.selectedLineIdx);
}




function renderTextColor() {
    gCtx.fillStyle = document.querySelector('input[name="fill-color"]').value
    gCtx.strokeStyle = document.querySelector('input[name="border-color"]').value
}


function drawText(line, baselineValue) {

    gCtx.textAlign = line.align
    gCtx.lineWidth = 2
    gCtx.font = line.size + "px " + line.style
    const text = line.txt
    gCtx.textBaseline = baselineValue
    const x = line.x
    const y = line.y
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
    // if (meme.selectedLineIdx === 0) {
    // }
    // else if (meme.selectedLineIdx === 1) {
    //     gCtx.textBaseline = 'bottom'
    //     gCtx.fillText(text, 0, gElCanvas.height)
    //     gCtx.strokeText(text, 0, gElCanvas.height)
    // }
    // else {
    //     gCtx.textBaseline = 'middle'
    //     gCtx.fillText(text, 0, gElCanvas.height / 2)
    //     gCtx.strokeText(text, 0, gElCanvas.height / 2)
    // 
}

function onSwitchLine() {
    const meme = getMeme()
    meme.selectedLineIdx++
    if (meme.selectedLineIdx === meme.lines.length){
        meme.selectedLineIdx = 0
        document.querySelector('.first-row').classList.add('active')
        document.querySelector('.second-row').classList.remove('active')
    }else{
        document.querySelector('.second-row').classList.add('active')
        document.querySelector('.first-row').classList.remove('active')

    }
    const elInput = document.querySelector('#meme-text')
    elInput.value = meme.lines[meme.selectedLineIdx].txt
}

function onChangeFontFamily(value){
    const line = _getMemeLine()
    line.style = value
    renderMeme(gCurrElImg)
}

function onClearLine() {
    const elInput = document.querySelector('#meme-text')
    elInput.value = ''
    const line = _getMemeLine()
    line.txt = ''
    renderMeme(gCurrElImg)
}


function onChangeFontSize(value) {
    const line = _getMemeLine()
    line.size += value
    renderMeme(gCurrElImg)
}





function setBorderColor(value) {
    // const line = _getMemeLine()
    gCtx.strokeStyle = value
    renderMeme(gCurrElImg)
}


function setFillColor(value) {
    // const line = _getMemeLine()
    gCtx.fillStyle = value
    renderMeme(gCurrElImg)
}

function setAlignItems(value) {
    const line = _getMemeLine()
    line.align = value
    if (value === 'right') line.x = gElCanvas.width
    else if (value === 'center') line.x = gElCanvas.width / 2
    else line.x = 0
    renderMeme(gCurrElImg)

}

function renderImgFromUser(img){
    gCurrElImg = img
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



// FACEBOOK SHARE

function onUploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    doUploadImg(imgDataUrl, onSuccess)
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




function onDown(ev) {
    if (gIsPressed) return
    gIsPressed = true
    draw(ev)
    // document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    if (!gIsPressed) return
    console.log('here?');
    draw(ev)
}

function onUp() {
    gIsPressed = false
    // document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        console.log('ev:', ev)
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}


function _getMemeLine() {
    const meme = getMeme()
    const lineIdx = meme.selectedLineIdx
    const line = meme.lines[lineIdx]
    return line
}



// DOWNLOAD CANVAS

function downloadCanvas(elLink) {
    const canvasContent = gElCanvas.toDataURL('canvas/jpeg') // image/jpeg the default format
    elLink.href = canvasContent
}








