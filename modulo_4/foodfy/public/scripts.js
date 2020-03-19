const clicksSmall = document.querySelectorAll('h4')
const clicksSmall2 = document.querySelector('small')

for(let clickSmall of clicksSmall) {
  clickSmall.addEventListener("click",function(){
    const text = clicksSmall2.innerHTML
    const clicks = clickSmall.nextElementSibling

    if(text == 'Mostrar'){
      clicks.classList.add('active') 
      clicksSmall2.innerText = "Esconder"
    } else if(text == 'Esconder'){
      clicks.classList.remove('active') 
      clicksSmall2.innerText = "Mostrar"
    }

  })
  
}