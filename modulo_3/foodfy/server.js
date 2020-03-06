const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const receitas = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true
})

server.get("/", function(req, res) {
  let receitasFiltro = []

  for(let i = 0; i < 6; i++){
    const obj = receitas[i]
    obj.index = i
    receitasFiltro.push(obj)
  }
  return res.render("home", { items: receitasFiltro })
})

server.get("/receitas", function(req, res) {
  return res.render("receitas", { items: receitas })
})

server.get("/sobre", function(req, res) {
  const sobre = {
    titulo: "Sobre o Foodfy",
    conteudo1: "Suspendisse placerat neque neque. Morbi dictum nulla non sapien rhoncus, et mattis erat commodo. Aliquam vel lacus a justo mollis luctus. Proin vel auctor eros, sed eleifend nunc. Curabitur eget tincidunt risus. Mauris malesuada facilisis magna, vitae volutpat sapien tristique eu. Morbi metus nunc, interdum in erat placerat, aliquam iaculis massa. Duis vulputate varius justo pharetra maximus. In vehicula enim nec nibh porta tincidunt. Vestibulum at ultrices turpis, non dictum metus. Vivamus ligula ex, semper vitae eros ut, euismod convallis augue.",
    conteudo2: "Fusce nec pulvinar nunc. Duis porttitor tincidunt accumsan. Quisque pulvinar mollis ipsum ut accumsan. Proin ligula lectus, rutrum vel nisl quis, efficitur porttitor nisl. Morbi ut accumsan felis, eu ultrices lacus. Integer in tincidunt arcu, et posuere ligula. Morbi cursus facilisis feugiat. Praesent euismod nec nisl at accumsan. Donec libero neque, vulputate semper orci et, malesuada sodales eros. Nunc ut nulla faucibus enim ultricies euismod.",
    subtitulo1: "Como tudo começou…",
    subtitulo2: "Nossas receitas",
  }
  return res.render("sobre", { sobre })
})

server.get("/receita/:index", function(req, res) {
  const { index: receitaIndex } = req.params

  const receita = receitas[receitaIndex]

  if (!receita) return res.send("Receita não encontrada")

  return res.render("receita", { receita })

})

server.listen(5000, function(){
  console.log('ok')
})