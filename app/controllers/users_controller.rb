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

  def destroy
    if @user.destroy
      redirect_to edit_user_path(@user)
    else
      flash.now[:error] = "削除に失敗しました"
      render :edit
    end
  end

  def avatar_destroy
    if @user.update(avatar: nil)
      respond_to do |format|
        format.html { redirect_to edit_user_path(@user) }
        format.json
      end
    else
      flash.now[:error] = "写真の削除に失敗しました"
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
    params.require(:user).permit(:name, :avatar, :profile)
  end

  def set_user
    @user = User.find(params[:id])
  end
end
