const images = document.querySelectorAll("#page-home .content .row .paint img")

let PAINTINGS = []
let index = 0


for(let image of images) {
  image.addEventListener("click", handlePaintsDescription)
}

function handlePaintsDescription (event){
  index = 0
  PAINTINGS = []

  const modal = document.querySelector("#modal")
  const modalImg = document.querySelector("#modal .content img")

  const imageSrc = event.target.attributes["src"].value
  const alt = event.target.attributes["alt"].value
  
  modalImg.attributes["src"].value = imageSrc
  modalImg.attributes["alt"].value = alt

  fetch("./public/js/pinturas.json")
  .then( res => res.json() )
  .then( paints => {
    for(let paint of paints) {
      if(new RegExp(paint.src, 'i').test(imageSrc)) {
        for(let i = 0; i < paint.imgs.length; i++)
          PAINTINGS.push({src: paint.src + paint.imgs[i], alt: paint.paint})
      }
    }
    modal.classList.toggle("hide")
  })  
}

const buttonsImage = document.querySelectorAll("#modal #arrows button")

for(let button of buttonsImage) {
  button.addEventListener("click", handleButtonImage)
}



function handleButtonImage (event) {
  // Elemento button: class 1-esquerda class 2-direita
  const button = event.target.classList[0]
  
  if(button == 1) {
    
    index--
    if(index < 0) index = 0
  }

  if(button == 2) {
    index++
    if(index >= PAINTINGS.length) index = PAINTINGS.length-1
  }

  const modalImg = document.querySelector("#modal .content img")
  
  modalImg.attributes["src"].value = PAINTINGS[index].src
  modalImg.attributes["alt"].value = PAINTINGS[index].alt
}

function closeModal() {
  const modal = document.querySelector("#modal")
  modal.classList.toggle("hide")
}