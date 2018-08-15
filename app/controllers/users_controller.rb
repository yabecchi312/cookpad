class UsersController < ApplicationController
  before_action :set_user
  def show
  end

  def edit
  end

  def update
    @user.update(user_params)
    render :edit
  end

  def follow
    current_user.follow(@user)
    respond_to do |format|
      format.html { redirect_to @user }
      format.js
    end
  end

  def unfollow
    current_user.stop_following(@user)
    respond_to do |format|
      format.html { redirect_to @user }
      format.js
    end
  end

  private

  def user_params
    params.require(:user).permit(:name)
  end

  def set_user
    @user = User.find(params[:id])
  end
end
