class DiariesController < ApplicationController
  def index
    @user = User.find(current_user)
    @diaries = current_user.diaries.order(id: :desc).page(params[:page]).per(5)
  end

  def new
    @user = User.find(current_user.id)
    @diary = Diary.new
  end

  def create
    @diary = Diary.new(diary_params)
    if @diary.save
      redirect_to diaries_path
    else
      render :new
    end
  end

  def destroy
    @diary = Diary.find(params[:id])
    @diary.destroy
    redirect_to diaries_path
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
