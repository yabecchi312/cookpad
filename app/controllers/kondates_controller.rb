class KondatesController < ApplicationController
  def index
  end

  def new
    @kondate = Kondate.new
  end

  def create
    @kondate = Kondate.new(create_params)
    if @kondate.save
      redirect_to kondates_path, notice: '献立を作成しました'
    else
      render :new
    end
  end

  def recent
  end


  private

  def create_params
    params.require(:kondate).permit(
      :title,
      :image,
      :point,
      :tips,
      :cooking_time,
      ).merge(user_id: current_user.id)
  end
end
