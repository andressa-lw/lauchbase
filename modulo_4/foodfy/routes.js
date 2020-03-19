
const express = require('express')
const routes = express.Router()
const site = require('./controllers/site')
const recipes = require('./controllers/recipes')

routes.get("/", site.redirect)
routes.get("/site", site.index)
routes.get("/site/sobre", site.about)
routes.get("/site/receitas", site.showrecipes)
routes.get("/site/receita/:id", site.showrecipe)

routes.get("/admin", recipes.redirect)
routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita

routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita

routes.use(function(req, res) {
  res.status(404).render("admin/not-found");
});

module.exports = routes