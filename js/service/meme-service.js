'use strict'

let gMeme
let gImgs
let gIsTextDrag = false


function getImgs() {
    return gImgs
}

function createImgs() {
    gImgs = [
        { id: 1, url: 'img/1.jpg', keywords: ['Trump', 'Celebrity'] },
        { id: 2, url: 'img/2.jpg', keywords: ['Dog', 'Cute'] },
        { id: 3, url: 'img/3.jpg', keywords: ['Dog', 'Cute', 'Baby', 'Sleep'] },
        { id: 4, url: 'img/4.jpg', keywords: ['Cat', 'Cute', 'Sleep'] },
        { id: 5, url: 'img/5.jpg', keywords: ['Boy', 'Cute', 'Success'] },
        { id: 6, url: 'img/6.jpg', keywords: ['History', 'Funny'] },
        { id: 7, url: 'img/7.jpg', keywords: ['Boy', 'Cute', 'Suprise'] },
        { id: 8, url: 'img/8.jpg', keywords: ['Celebrity', 'Funny'] },
        { id: 9, url: 'img/9.jpg', keywords: ['Boy', 'Cute', 'Asian'] },
        { id: 10, url: 'img/10.jpg', keywords: ['Celebrty', 'Obama', 'Funny'] },
        { id: 11, url: 'img/11.jpg', keywords: ['Sport', 'Kiss', 'man'] },
        { id: 12, url: 'img/12.jpg', keywords: ['Journalist', 'Israel', 'Question'] },
        { id: 13, url: 'img/13.jpg', keywords: ['Handsom', 'Clever'] },
        { id: 14, url: 'img/14.jpg', keywords: ['Black', 'Tough', 'Scary'] },
        { id: 15, url: 'img/15.jpg', keywords: ['Loser', 'Man', 'Little'] },
        { id: 16, url: 'img/16.jpg', keywords: ['Boy', 'Cute', 'Success'] },
        { id: 17, url: 'img/17.jpg', keywords: ['Boy', 'Cute', 'Success'] },
        { id: 18, url: 'img/18.jpg', keywords: ['Boy', 'Cute', 'Success'] },
        { id: 19, url: 'img/19.jpg', keywords: ['Boy', 'Cute', 'Success'] },
        { id: 20, url: 'img/20.jpg', keywords: ['Boy', 'Cute', 'Success'] },
        { id: 21, url: 'img/21.jpg', keywords: ['Boy', 'Cute', 'Success'] },
        { id: 22, url: 'img/22.jpg', keywords: ['Boy', 'Cute', 'Success'] },
    ];
}

function creategMeme() {
    gMeme = {
        selectedImgId: 1,
        selectedLineIdx: 0,
        lines: [
            {
                txt: '',
                size: 40,
                align: 'left',
                style: 'Impact',
                width: 0,
                x: 0,
                y: 0,
            },
            {
                txt: '',
                size: 40,
                align: 'left',
                style: 'Impact',
                width: 0,
                x: 0,
                y: gElCanvas.height,

            },
        ]
    }
}


function setImg(elImg) {
    gCurrElImg = elImg
    gMeme.selectedImgId = elImg.id
}

function getImgById(meme) {
    const img = gImgs.find(img => img.id === meme.selectedImgId)
    console.log(img.url);
    return img.url
}

function getMeme() {
    return gMeme
}

function setLineTxt(value) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.txt = value
}

function isTextClicked(clickedPos) {
    const line = getMemeLine()
    const x = line.x
    const y = line.y
    console.log('x:',x)
    console.log('clickedPos.x:',clickedPos.x)
    console.log('clickedPos.x-x:',clickedPos.x-x)
    console.log('clickedPos.y-y:',clickedPos.y-y)
    console.log('line.size:',line.size)
    console.log('line.width:',line.width)
    console.log('line.size >= clickedPos.y-y:',line.size >= clickedPos.y-y)
    console.log('line.width >= clickedPos.x-x:',line.width >= clickedPos.x-x)
    console.log('y:',y)
    console.log('clickedPos.y:',clickedPos.y)
    console.log('clickedPos.y-(y-line.size):',clickedPos.y-(y-line.size))
    const isClicked = (line.size >= clickedPos.y-y && line.width >= clickedPos.x-x && clickedPos.y-(y-line.size) > 0 && clickedPos.x-x > 0)
    console.log(isClicked);
    // console.log(line.width);

    return (isClicked)
    //If its smaller then the radius of the circle we are inside
    // return distance <= gCircle.size
}   

function setTextDrag(value){
    gIsTextDrag = value
}

function isTextDrag(){
    return gIsTextDrag
}
































function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)
    console.log('formData:', formData)
    // Send a post req with the image to the server
    fetch('//ca-upload.com/here/upload.php', { method: 'POST', body: formData })
        .then(res => res.text())
        .then(url => {
            console.log('url:', url)
            onSuccess(url)
        })
}