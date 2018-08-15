class RecipesController < ApplicationController
  def index
  end

  def new
    @recipe = Recipe.new
    @recipe.flows.build
    @recipe.ingredients.build
  end

  def create
    @recipe = Recipe.create(recipe_params)
    redirect_to root_path
  end

  def list
    @user = User.find(params[:id])
    @recipes = @user.recipes
  end

  private
  def recipe_params
    params.require(:recipe).permit(
      :title,
      :catch_copy,
      :image,
      :tips,
      :background,
      :user_id,
      { :ingredient_ids => [] },
      ingredients_attributes: [:name, :amount],
      flows_attributes: [:image, :text, :order]
      ).merge(user_id: current_user.id)
  end
end
