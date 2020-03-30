const currentPage = location.pathname
const menuItens = document.querySelectorAll("header nav a")

for (item of menuItens) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}

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
function paginate(selectedPage, totalPages) {
  let pages = [],
      oldPage

  for(let currentPage = 1; currentPage <= totalPages; currentPage++) {

      const firtsAndLastPage = currentPage == 1 || currentPage == totalPages
      const pagesAfterSelectedPage = currentPage <= selectedPage + 2
      const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

      if(firtsAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
          

          if (oldPage && currentPage - oldPage > 2) {
              pages.push("...")
          }

          if (oldPage && currentPage - oldPage == 2) {
              pages.push(oldPage + 1)
          }

          pages.push(currentPage)

          oldPage = currentPage

      }
  }
  return pages
}

function createPagination(pagination) {
  const filter = pagination.dataset.filter
  const page = +pagination.dataset.page
  const total = +pagination.dataset.total
  const pages = paginate(page, total)

  let elements = ""

  for (let page of pages) {
      if(String(page).includes("...")) {
          elements += `<span>${page}</span>`
      } else {
          if(filter) {
              elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
          } else {
              elements += `<a href="?page=${page}">${page}</a>`
          }
      } 
  }

  pagination.innerHTML = elements
} 

const pagination = document.querySelector(".pagination")

if(pagination) {
  createPagination(pagination)
}