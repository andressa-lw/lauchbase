const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const courses = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
  express: server,
  autoescape: false
})

server.get("/", function(req, res) {
  const about = {
    avatar: "https://avatars0.githubusercontent.com/u/28929274?s=200&v=4",
    titulo: "Rocketseat",
    descricao: "Mais do que uma plataforma de educação em tecnologia, somos uma comunidade incrível de programadores em busca do próximo nível 🚀<br><br>Em um mundo onde a informação fica obsoleta cada vez mais rápido, velocidade de aprendizado é a chave para o sucesso.<br><br>Por isso a Rocketseat oferece através de uma plataforma inteligente e metodologia prática, além de comunidade, eventos, conteúdo e conexão com o mercado de trabalho, todas as ferramentas que você precisa para masterizar no menor tempo possível as tecnologias mais modernas de desenvolvimento web e mobile, e dessa forma avançar para o próximo nível como programador.",
    tecnologias: [
      {nome: "HTML"},
      {nome: "CSS"},
      {nome: "JS"},
      {nome: "REACT"},
      {nome: "NODE"}
    ],
    links: [
      {nome: "Github", url: "#"},
      {nome: "Instagram", url: "#"},
      {nome: "Facebook", url: "#"},
    ]
  }

  return res.render("about", {about})
})

server.get("/courses", function(req, res) {
  return res.render("courses", {items: courses})
})

server.use(function(req, res) {
  res.status(404).render("not-found");
});

server.listen(5000, function() {
  console.log("server is running")
})