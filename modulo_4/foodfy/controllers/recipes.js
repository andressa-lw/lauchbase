const fs = require('fs')
const data = require("../data.json")

exports.redirect = function(req, res) {
  return res.redirect("admin/recipes/")
}

exports.index = function(req, res) {
  return res.render("admin/recipes/index", { recipes: data.recipes })
}

exports.create = function(req, res) {
  return res.render('admin/recipes/create')
}

exports.post = function(req, res) {
  const keys = Object.keys(req.body)

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send('Please, fill all fields')
    }
  }

  let id = 1
  const lastRecipe = data.recipes[data.recipes.length - 1]
  if (lastRecipe) {
    id = lastRecipe.id + 1
  } 

  data.recipes.push({
    ...req.body,
    id
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if (err) return res.send("Write file error!")

    return res.redirect(`/admin/recipes/${id}`)
  })
}

exports.show = function(req, res) {
  const { id } = req.params
  const foundRecipe = data.recipes.find(function(recipe)  {
    return recipe.id == id
  })

  if (!foundRecipe) return res.send("Recipe not found!")

  const recipe = {
    ...foundRecipe,
  }

  return res.render("admin/recipes/show", {recipe})
}

exports.edit = function(req, res) {
  const { id } = req.params

  const foundRecipe = data.recipes.find(function(recipe)  {
    return recipe.id == id
  })

  if (!foundRecipe) return res.send("Recipe not found!")

  const recipe = {
    ...foundRecipe,
    ingredient: foundRecipe.ingredients.toString().split(','),
    prepar: foundRecipe.preparation.toString().split(',')
  }
  
  return res.render('admin/recipes/edit', {recipe})
}

exports.put = function(req, res) {
  const { id } = req.body
  
  let index = 0
  const foundRecipe = data.recipes.find(function(recipe, foundIndex)  {
    if(id == recipe.id) {
      index = foundIndex
      return true
    }
  })

  if (!foundRecipe) return res.send("recipe not found!")

  const recipe = {
    ...foundRecipe,
    ...req.body,
    id: Number(req.body.id)
  }

  data.recipes[index] = recipe

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send("Write error!")

    return res.redirect(`/admin/recipes/${id}`)
  })
}

exports.delete = function(req, res) {
  const { id } = req.body

  const filteredRecipes = data.recipes.filter(function(recipe) {
    return recipe.id != id
  })

  data.recipes = filteredRecipes

  fs.writeFile("data.json", JSON.stringify(data, null, 1), function(err) {
    if(err) return res.send("Write error!")

    return res.redirect(`/admin/recipes`)
  })
}