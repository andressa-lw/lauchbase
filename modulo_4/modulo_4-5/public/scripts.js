const cards = document.querySelectorAll('.card')

for (let card of cards) {
    card.addEventListener('click', function () {
        const idConteudo = card.getAttribute('id')
        window.location.href = `/course?id=${idConteudo}`
    })

}