class CommentsController < ApplicationController
  before_action :set_recipe
  def create
    @comment = Comment.create(comment_params)
    respond_to do |format|
      format.html { redirect_to recipe_path(@recipe.id) }
      format.json
    end
  end

  private
  def set_recipe
    @recipe = Recipe.find(params[:recipe_id])
  end

  def comment_params
    params.require(:comment).permit(:text).merge(user_id: current_user.id, recipe_id: @recipe.id)
  end
end
