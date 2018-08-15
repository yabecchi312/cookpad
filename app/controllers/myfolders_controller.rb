class MyfoldersController < ApplicationController
  def index
    @user = User.find(current_user.id)
    @recipes = []
    @user.myfolders.each do |myfolder|
      @recipes.push(myfolder.recipe)
    end
  end

  def create
    @recipe = Recipe.find(params[:recipe_id])
    @recipe.register_to_myfolder(current_user)
  end

  def destroy
    @recipe = Like.find(params[:id]).recipe
    @recipe.unregister_from_myfolder(current_user)
  end
end
