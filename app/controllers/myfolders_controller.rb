class MyfoldersController < ApplicationController
  protect_from_forgery except: [:create, :destroy]

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
    @recipe = Myfolder.find(params[:id]).recipe
    @recipe.unregister_from_myfolder(current_user)
  end
end
