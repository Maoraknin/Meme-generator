'use strict'


let gCurrElImg

let gElCanvas
let gCtx
let gIsPressed = false

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function onInit() {
    renderGallery()
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    addMouseListeners()
    addTouchListeners()
    document.querySelector('#meme-text').addEventListener("keyup", setMemeTxt, true);

    gCtx.fillStyle = document.querySelector('input[name="fill-color"]').value
    gCtx.strokeStyle = document.querySelector('input[name="border-color"]').value
}

function popo(img) {
    console.log('img:', img)
}



function setMemeTxt() {
    const elInput = document.querySelector('#meme-text')
    const value = elInput.value
    console.log('value:',value)
    // elInput.value = ''
    const meme = getMeme()
    setLineTxt(value)
    onImgSelect(gCurrElImg)
}

function renderMeme() {
    const meme = getMeme()
    drawText(meme)
}

function setImg(elImg) {
    if (gCurrElImg !== elImg) gCurrElImg = elImg
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}


function renderTextColor() {
    gCtx.fillStyle = document.querySelector('input[name="fill-color"]').value
    gCtx.strokeStyle = document.querySelector('input[name="border-color"]').value
}


function drawText(meme) {
    console.log('here');
    const lineIdx = meme.selectedLineIdx
    const line = meme.lines[lineIdx]
    gCtx.textAlign = line.align
    gCtx.lineWidth = 2
    // gCtx.strokeStyle = line.borderColor
    // gCtx.fillStyle = line.color
    const text = line.txt
    if (meme.selectedLineIdx === 0) {
        gCtx.font = "40px Impact"
        gCtx.textBaseline = 'top'
        gCtx.fillText(text, 0, 0) // Draws (fills) a given text at the given (x, y) position.
        gCtx.strokeText(text, 0, 0)
    }
    else if (meme.selectedLineIdx === 1) {
        gCtx.font = "40px Impact"
        gCtx.textBaseline = 'bottom'
        gCtx.fillText(text, 0, gElCanvas.height) // Draws (fills) a given text at the given (x, y) position.
        gCtx.strokeText(text, 0, gElCanvas.height)
    }
    else {
        gCtx.font = "40px Impact"
        gCtx.textBaseline = 'bottom'
        gCtx.fillText(text, 0, gElCanvas.height / 2) // Draws (fills) a given text at the given (x, y) position.
        gCtx.strokeText(text, 0, gElCanvas.height / 2)
    }

    // Draws (strokes) a given text at the given (x, y) position.
}




function setBorderColor(value) {
    gCtx.strokeStyle = value
}


function setFillColor(value) {
    gCtx.fillStyle = value
}



function draw(ev) {
    console.log(ev);
    const pos = getEvPos(ev)

    switch (gCurrShape) {
        case 'triangle':
            drawTriangle(pos.x, pos.y)
            break
        case 'rect':
            drawRect(pos.x, pos.y)
            break
        case 'arc':
            drawArc(pos.x, pos.y)
            break
    }
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








// function clearCanvas() {
//     const colorBox = gCtx.fillStyle
//     gCtx.fillStyle = '#ffffff'
//     //Clear the canvas,  fill it with grey background
//     gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
//     setFillColor(colorBox)
// }


// function downloadCanvas(elLink) {
//     const canvasContent = gElCanvas.toDataURL('canvas/jpeg') // image/jpeg the default format
//     elLink.href = canvasContent
// }




// function onImgInput(ev) {
//     loadImageFromInput(ev, renderImg)
// }






// function loadImageFromInput(ev, onImageReady) {
//     const reader = new FileReader()
//     // After we read the file
//     reader.onload = (event) => {
//         let img = new Image() // Create a new html img element
//         img.src = event.target.result
//         img.onload = () => onImageReady(img)
//     }

//     reader.readAsDataURL(ev.target.files[0]) // Read the file we picked

// }




// function onUploadImg() {
//     const imgDataUrl = gElCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format

//     // A function to be called if request succeeds
//     function onSuccess(uploadedImgUrl) {
//         // Encode the instance of certain characters in the url
//         const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
//         window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
//     }
//     // Send the image to the server
//     doUploadImg(imgDataUrl, onSuccess)
// }
