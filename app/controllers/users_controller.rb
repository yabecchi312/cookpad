class UsersController < ApplicationController
  before_action :set_user
  def show
  end

  def edit
  end

  def update
    if @user.update(user_params)
      respond_to do |format|
        format.html { redirect_to edit_user_path(@user) }
        format.json
      end
    else
      render :edit
    end
  end

  def follow
    current_user.follow(@user)
  end

  def unfollow
    current_user.stop_following(@user)
  end

  private

  def user_params
    params.require(:user).permit(:name, :avatar)
  end

  def set_user
    @user = User.find(params[:id])
  end
end
