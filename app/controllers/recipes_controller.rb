class RecipesController < ApplicationController
   impressionist :actions=> [:show]

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


  def show
    @recipe = Recipe.find(params[:id])
    @recipes = Recipe.all
    @ingredients = @recipe.ingredients.includes(:recipe)
    @flows = @recipe.flows.includes(:recipe)
    @comment = Comment.new
    @comments = @recipe.comments.includes(:user)
    impressionist(@recipe, nil, unique: [:session_hash])
    @pv = @recipe.impressionist_count
    @today = @recipe.impressionist_count(start_date: Date.today)
    @history = @recipe.register_to_history(current_user)
  end


  def list
    @user = User.find(params[:id])
    @recipes = @user.recipes.includes(:ingredients)
    if params[:keyword].present?
      @recipes = Recipe.find(Recipe.select_target_recipe_id(params[:keyword],@user.id))
    end
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

  private
  def recipe_params
    params.require(:recipe).permit(
      :title,
      :catch_copy,
      :image,
      :tips,
      :background,
      :user_id,
      { ingredients_attributes: [ :name , :amount ] },
      { flows_attributes: [:image, :text, :order] }
      ).merge(user_id: current_user.id)
  end
end
