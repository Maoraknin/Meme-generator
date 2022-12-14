'use strict'

let gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['Trump', 'Celebrity'] },
    { id: 2, url: 'img/2.jpg', keywords: ['Dog', 'Cute'] },
    { id: 2, url: 'img/3.jpg', keywords: ['Dog', 'Cute', 'Baby', 'Sleep'] },
    { id: 2, url: 'img/4.jpg', keywords: ['Cat', 'Cute', 'Sleep'] },
    { id: 2, url: 'img/5.jpg', keywords: ['Boy', 'Cute', 'Success'] },
];


function getImgs(){
    return gImgs
}
 

let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'write Something',
            size: 20,
            align: 'left'
        },
        // {
        //     txt: 'I sometimes eat pizza',
        //     size: 20,
        //     align: 'left',
        //     color: 'red',
        //     borderColor: 'blue'
        // },
        // {
        //     txt: 'I sometimes eat Poop',
        //     size: 20,
        //     align: 'middle',
        //     color: 'brown',
        //     borderColor: 'blue'
        // },

    ]
}

function getImgById(meme){
    const img = gImgs.find(img => img.id === meme.selectedImgId)
    console.log(img.url);
    return img.url
}

function getMeme() {
    return gMeme
}

function setLineTxt(value){
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.txt = value
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