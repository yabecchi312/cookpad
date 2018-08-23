class RecipesController < ApplicationController

  def new
    @recipe = Recipe.new
    @recipe.flows.build
    @recipe.ingredients.build
  end

  def create
    @recipe = Recipe.create(recipe_params)
    redirect_to root_path
  end

  def edit
    @recipe = Recipe.find(params[:id])
  end

  def update
    @recipe = Recipe.find(params[:id])
    if @recipe.update(recipe_params)
      redirect_to root_path, notice: "レシピを編集しました"
    else
      render :edit
    end
  end

  def show
    @recipe = Recipe.find(params[:id])
    @ingredients = @recipe.ingredients.includes(:recipe)
    @flows = @recipe.flows.includes(:recipe)
  end


  def list
    @user = User.find(params[:id])
    @recipes = @user.recipes
  end

  def destroy
    @recipe = Recipe.find(params[:id])
    if @recipe.destroy
      redirect_to action: "list", id: current_user.id
    else
      flash.now[:error] = "レシピの削除に失敗しました"
      render action: "list", id: current_user.id
    end
  end

  def save
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
      { ingredients_attributes: [:id, :recipe_id, :name , :amount, :_destroy ] },
      { flows_attributes: [:id, :recipe_id, :image, :text, :order, :_destroy ] }
      ).merge(user_id: current_user.id)
  end
end
