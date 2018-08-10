class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end
  def follow
    @user = User.find(params[:id])
    #ログイン中のユーザーで対象のユーザー(@user)をフォローする
    current_user.follow(@user)
    respond_to do |format|
      format.html { redirect_to @user }
      format.js
    end
  end

  def unfollow
    @user = User.find(params[:id])
    #ログイン中のユーザーで対象のユーザー(@user)をフォロー解除する
    current_user.stop_following(@user)
    respond_to do |format|
      format.html { redirect_to @user }
      format.js
    end
  end
end
