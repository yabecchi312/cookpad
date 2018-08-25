class MyfoldersController < ApplicationController
  protect_from_forgery except: [:create, :destroy]

  def index
    @recipes = []
    current_user.myfolders.includes(recipe: :ingredients).each do |myfolder|
      @recipes.push(myfolder.recipe)
    end
    if params[:keyword].present?
      @recipes = Recipe.find(Recipe.select_target_recipe_id(params[:keyword]) & @recipes.map{|recipe| recipe.id})
    end
  end

  def create
    @recipe = Recipe.find(params[:recipe_id])
    unless @recipe.register_to_myfolder?(current_user)
      if @recipe.register_to_myfolder(current_user)
        respond_to do |format|
          format.html { redirect_to request.referrer || root_url }
          format.json{@recipe}
        end
      else
        render :index
      end
    end
  end

  def destroy
    @recipe = Myfolder.find(params[:id]).recipe
    if @recipe.register_to_myfolder?(current_user)
      if @recipe.unregister_from_myfolder(current_user)
        respond_to do |format|
          format.html { redirect_to request.referrer || root_url }
          format.json
        end
      else
        render :index
      end
    end
  end
end
