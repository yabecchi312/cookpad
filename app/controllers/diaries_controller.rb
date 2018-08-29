class DiariesController < ApplicationController
  def index
    @user = User.find(current_user.id)
    @diaries = @user.diaries
  end

  def post
  end

  def new
    @user = User.find(current_user.id)
    @diary = Diary.new
  end

  def create
    @diary = Diary.create(diary_params)
    redirect_to action: "index", id: current_user.id
  end

  def destroy
    @diary = Diary.find(:user_id)
    @diary.destroy
    redirect_to action: "index", id: current_user.id
  end

  private
  def diary_params
    params.require(:diary).permit(
      :id,
      :title,
      :date,
      :image,
      :text,
      :type).merge(user_id: current_user.id)
  end
end
