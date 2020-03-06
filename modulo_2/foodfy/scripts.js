const modalOverlay = document.querySelector('.modal-overlay')
const receitas = document.querySelectorAll('.box')

for(let receita of receitas) {
  receita.addEventListener('click', function(){
    modalOverlay.querySelector(".conteudo-modal img").src = receita.querySelector(".box img").src;
    modalOverlay.querySelector(".conteudo-modal h3").innerHTML = receita.querySelector(".box h3").textContent;
    modalOverlay.querySelector(".conteudo-modal p").innerHTML = receita.querySelector(".box p").textContent;
    modalOverlay.classList.add('active')
  })
}

document.querySelector('.close').addEventListener('click', function(){
  modalOverlay.classList.remove('active')
})

