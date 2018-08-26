class CommentsController < ApplicationController
  def create
    @comment = Comment.create(text: params[:text], recipe_id: params[:recipe_id], user_id: current_user.id)
    redirect_to recipe_path(@recipe.id)
  end

  private
  def comment_params
    params.permit(:text, :recipe_id)
  end
end
