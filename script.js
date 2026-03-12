const imageInput = document.getElementById("imageInput")
const processBtn = document.getElementById("processBtn")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const downloadBtn = document.getElementById("downloadBtn")

const uploadStatus = document.getElementById("uploadStatus")
const watermarkStatus = document.getElementById("watermarkStatus")

let uploadedImage = new Image()
let watermark = new Image()

watermark.src = "watermark.png"

imageInput.addEventListener("change", function(e){

const file = e.target.files[0]
const reader = new FileReader()

reader.onload = function(event){

uploadedImage.src = event.target.result
uploadStatus.innerText = "✔ Изображение загружено"

}

reader.readAsDataURL(file)

})

processBtn.addEventListener("click", function(){

if(!uploadedImage.src){
alert("Сначала загрузите изображение")
return
}

const width = uploadedImage.naturalWidth
const height = uploadedImage.naturalHeight

canvas.width = width
canvas.height = height

ctx.clearRect(0,0,width,height)

ctx.drawImage(uploadedImage,0,0,width,height)

ctx.drawImage(watermark,0,0,width,height)

const dataURL = canvas.toDataURL("image/png",1)

downloadBtn.href = dataURL
downloadBtn.classList.add("active")

watermarkStatus.innerText = "✔ Водяной знак добавлен"

})

document.addEventListener("paste", function(e){

const items = e.clipboardData.items

for (let i = 0; i < items.length; i++) {

if (items[i].type.indexOf("image") !== -1) {

const file = items[i].getAsFile()

const reader = new FileReader()

reader.onload = function(event){

uploadedImage.src = event.target.result
uploadStatus.innerText = "✔ Изображение вставлено из буфера"

}

reader.readAsDataURL(file)

}

}

})
