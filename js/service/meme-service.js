'use strict'

const SAVED_MEMES_IMG_KEY = 'saved-memes-img-DB'
const SAVED_MEMES_KEY = 'saved-memes-DB'


let gMeme
let gImgs
let gSavedMemes
let gSavedMemesImg
let gIsTextDrag = false


function getImgs() {
    return gImgs
}

function createSavedMemes() {
    gSavedMemesImg = loadFromStorage(SAVED_MEMES_IMG_KEY)
    if (!gSavedMemesImg) gSavedMemesImg = []
    gSavedMemes = loadFromStorage(SAVED_MEMES_KEY)
    if (!gSavedMemes) gSavedMemes = []
}

function addSavedMeme(canvas) {
    console.log(gSavedMemes);
    gSavedMemes.push(gMeme)
    gSavedMemesImg.push(canvas.toDataURL())
    saveToStorage(SAVED_MEMES_KEY, gSavedMemes)
    saveToStorage(SAVED_MEMES_IMG_KEY, gSavedMemesImg)
}

function getSavedMemes() {
    return gSavedMemesImg
}

function createImgs() {
    gImgs = [
        { id: 1, url: 'img/1.jpg', keywords: ['trump', 'celebrity'] },
        { id: 2, url: 'img/2.jpg', keywords: ['dog', 'cute'] },
        { id: 3, url: 'img/3.jpg', keywords: ['dog', 'cute', 'baby', 'sleep'] },
        { id: 4, url: 'img/4.jpg', keywords: ['cat', 'cute', 'sleep'] },
        { id: 5, url: 'img/5.jpg', keywords: ['boy', 'cute', 'success'] },
        { id: 6, url: 'img/6.jpg', keywords: ['history', 'funny'] },
        { id: 7, url: 'img/7.jpg', keywords: ['boy', 'cute', 'suprise'] },
        { id: 8, url: 'img/8.jpg', keywords: ['celebrity', 'funny'] },
        { id: 9, url: 'img/9.jpg', keywords: ['boy', 'cute', 'asian'] },
        { id: 10, url: 'img/10.jpg', keywords: ['celebrty', 'obama', 'funny'] },
        { id: 11, url: 'img/11.jpg', keywords: ['sport', 'kiss', 'man'] },
        { id: 12, url: 'img/12.jpg', keywords: ['journalist', 'israel', 'question'] },
        { id: 13, url: 'img/13.jpg', keywords: ['handsom', 'clever'] },
        { id: 14, url: 'img/14.jpg', keywords: ['black', 'tough', 'scary'] },
        { id: 15, url: 'img/15.jpg', keywords: ['loser', 'man', 'little'] },
        { id: 16, url: 'img/16.jpg', keywords: ['sci-fi', 'funny'] },
        { id: 17, url: 'img/17.jpg', keywords: ['putin', 'leader', 'celebrity'] },
        { id: 18, url: 'img/18.jpg', keywords: ['looking', 'childhood', 'cartoon'] },
        { id: 19, url: 'img/19.jpg', keywords: ['field', 'happy'] },
        { id: 20, url: 'img/20.jpg', keywords: ['shout', 'angry'] },
        { id: 21, url: 'img/21.jpg', keywords: ['dancing', 'cute', 'optimistic'] },
        { id: 22, url: 'img/22.jpg', keywords: ['trump', 'celebrity', 'angry'] },
        { id: 23, url: 'img/23.jpg', keywords: ['evil', 'bald', 'sarcasam'] },
        { id: 23, url: 'img/24.jpg', keywords: ['dog', 'streching', 'cute'] },
        { id: 25, url: 'img/25.jpg', keywords: ['opra', 'celebrity', 'happy'] },
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
                baseLine: 'top',
                x: 0,
                y: 0,
            },
            {
                txt: '',
                size: 40,
                align: 'left',
                style: 'Impact',
                width: 0,
                baseLine: 'bottom',
                x: 0,
                y: gElCanvas.height,

            },
        ]
    }
}

function setSavedgMeme(idx){
    gSavedMemes = loadFromStorage(SAVED_MEMES_KEY)
    gMeme = gSavedMemes[idx]

}




function getMeme() {
    return gMeme
}

function setLineTxt(value) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.txt = value
}

function getTextClickedIdx(clickedPos) {
    const meme = getMeme()
    const idx = meme.lines.findIndex(line => {
        const x = line.x
        const y = line.y
        const isClicked = (line.size >= clickedPos.y - y && line.width >= clickedPos.x - x && clickedPos.y - (y - line.size) > 0 && clickedPos.x - x > 0)
        return isClicked
    })

    return idx



    // const line = getMemeLine()
    // const x = line.x
    // const y = line.y
    // const isClicked = (line.size >= clickedPos.y - y && line.width >= clickedPos.x - x && clickedPos.y - (y - line.size) > 0 && clickedPos.x - x > 0)

    // return (isClicked)
}

function setTextDrag(value) {
    gIsTextDrag = value
}

function isTextDrag() {
    return gIsTextDrag
}

function clearLine() {
    const meme = getMeme()
    const idx = meme.selectedLineIdx
    meme.lines.splice(idx, 1)
    switchLine()
    const line = getMemeLine()
    drawRect(line)
}

function switchLine() {
    const meme = getMeme()
    meme.selectedLineIdx++
    if (meme.selectedLineIdx >= meme.lines.length) {
        meme.selectedLineIdx = 0
    }
}

function addTextLine() {
    const line = {
        txt: '',
        size: 40,
        align: 'left',
        style: 'Impact',
        width: 0,
        baseLine: 'middle',
        x: 0,
        y: gElCanvas.height / 2,
    }
    return line
}

function addStickerLine(sticker){
    const line = {
        txt: sticker,
        size: 40,
        align: 'center',
        style: 'Impact',
        width: 40,
        baseLine: 'middle',
        x: gElCanvas.height / 2,
        y: gElCanvas.height / 2,
    }
    return line
}

function moveText(x, y) {
    const line = getMemeLine()
    line.x += x
    line.y += y

}

function changeFontFamily(value) {
    const line = getMemeLine()
    line.style = value
}

function setAlignItems(value) {
    const line = getMemeLine()
    line.align = value
    if (value === 'right') line.x = gElCanvas.width
    else if (value === 'center') line.x = gElCanvas.width / 2
    else line.x = 0
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