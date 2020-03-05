const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card')
const modal = document.querySelector('.modal');

for (let card of cards) {
    card.addEventListener('click', function () {

        const idConteudo = card.getAttribute('id')

        modalOverlay.classList.add('active')

        modalOverlay.querySelector('iframe').src = `https://rocketseat.com.br/${idConteudo}`
    })

    card.addEventListener("click", function() {
        modalOverlay.classList.add('active')
    });
}

document.querySelector('.close-modal').addEventListener("click", function(){
    modalOverlay.classList.remove('active')
});

document.querySelector('.full-modal').addEventListener("click", function(){
    if(modal.classList.contains('maximize')){
        modal.classList.remove('maximize')
        modal.querySelector('.full-modal i').innerHTML = 'fullscreen'
    }else{
        modal.classList.add('maximize')
        modal.querySelector('.full-modal i').innerHTML = 'fullscreen_exit'
    }
});