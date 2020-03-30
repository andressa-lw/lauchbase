
const express = require('express')
const routes = express.Router()
const site = require('./app/controllers/site')
const recipes = require('./app/controllers/recipes')
const chefs = require('./app/controllers/chefs')

routes.get("/", site.redirect)
routes.get("/site", site.index)
routes.get("/site/sobre", site.about)
routes.get("/site/receitas", site.receitas)
routes.get("/site/chefs", site.chefs)
routes.get("/site/search", site.search)
routes.get("/site/receita/:id", site.show)

routes.get("/admin", recipes.redirect)
routes.get("/admin/recipes", recipes.index);
routes.get("/admin/recipes/create", recipes.create);
routes.get("/admin/recipes/:id", recipes.show);
routes.get("/admin/recipes/:id/edit", recipes.edit);
routes.post("/admin/recipes", recipes.post);
routes.put("/admin/recipes", recipes.put);
routes.delete("/admin/recipes", recipes.delete);

routes.get("/admin/chefs", chefs.index);
routes.get("/admin/chefs/create", chefs.create);
routes.get("/admin/chefs/:id", chefs.show);
routes.get("/admin/chefs/:id/edit", chefs.edit);
routes.post("/admin/chefs", chefs.post);
routes.put("/admin/chefs", chefs.put);
routes.delete("/admin/chefs", chefs.delete);

routes.use(function(req, res) {
  res.status(404).render("admin/not-found");
});

module.exports = routes