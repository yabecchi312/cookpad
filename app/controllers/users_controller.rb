class UsersController < ApplicationController
  before_action :set_user
  def show
  end

  def edit
  end

  def update
  end

  def follow
    current_user.follow(@user)
  end

  def unfollow
    current_user.stop_following(@user)
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
end
