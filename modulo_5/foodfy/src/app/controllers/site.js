const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')

module.exports = {
  redirect(req, res) {
    return res.redirect("site/")
  },
  index(req, res) {
    Recipe.all(function(recipes){
      return res.render("site/index", {recipes})
    })
  },
  receitas(req, res) {
    let {filter, page, limit} = req.query
    page = page || 1
    limit = limit || 3
    let offset = limit * (page - 1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(recipes) {

        const pagination = {
          total: Math.ceil(recipes[0].total / limit),
          page
        }
        return res.render("site/receitas", {recipes, pagination, filter})
      }
    }

    Recipe.paginate(params)
  },
  show(req, res) {
    Recipe.find(req.params.id, function(recipe) {
      if (!recipe) return res.send("Recipe not found!")

      return res.render("site/show", {recipe})
    })
  },
  about(req, res) {
    const sobre = {
      titulo: "Sobre o Foodfy",
      conteudo1: "Suspendisse placerat neque neque. Morbi dictum nulla non sapien rhoncus, et mattis erat commodo. Aliquam vel lacus a justo mollis luctus. Proin vel auctor eros, sed eleifend nunc. Curabitur eget tincidunt risus. Mauris malesuada facilisis magna, vitae volutpat sapien tristique eu. Morbi metus nunc, interdum in erat placerat, aliquam iaculis massa. Duis vulputate varius justo pharetra maximus. In vehicula enim nec nibh porta tincidunt. Vestibulum at ultrices turpis, non dictum metus. Vivamus ligula ex, semper vitae eros ut, euismod convallis augue.",
      conteudo2: "Fusce nec pulvinar nunc. Duis porttitor tincidunt accumsan. Quisque pulvinar mollis ipsum ut accumsan. Proin ligula lectus, rutrum vel nisl quis, efficitur porttitor nisl. Morbi ut accumsan felis, eu ultrices lacus. Integer in tincidunt arcu, et posuere ligula. Morbi cursus facilisis feugiat. Praesent euismod nec nisl at accumsan. Donec libero neque, vulputate semper orci et, malesuada sodales eros. Nunc ut nulla faucibus enim ultricies euismod.",
      subtitulo1: "Como tudo começou…",
      subtitulo2: "Nossas receitas",
    }
    return res.render("site/sobre", { sobre })
  },
  search(req, res) {
    let {filter, page, limit} = req.query
    page = page || 1
    limit = limit || 3
    let offset = limit * (page - 1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(recipes) {

        const pagination = {
          total: Math.ceil(recipes[0].total / limit),
          page
        }
        return res.render("site/search", {recipes, pagination, filter})
      }
    }

    Recipe.paginate(params)
  },
  chefs(req, res) {
    Chef.all(function(chefs){
      return res.render("site/chefs", {chefs})
    })
  }
}