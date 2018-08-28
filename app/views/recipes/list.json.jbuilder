json.array! @recipes do |recipe|
  json.recipe_id recipe.id
  json.title recipe.title
  json.image recipe.image
  json.user_id @user.id
  json.user_name @user.name
end
