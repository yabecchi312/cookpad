class TsukureposController < ApplicationController
  def index
    @tsukurepo = Tsukurepo.new
  end

  def create
    @tsukurepo = Tsukurepo.new(tsukurepo_params)
    if @tsukurepo.save
      redirect_to root_path
    else
      render :index
    end
  end


  private
  def tsukurepo_params
    params.require(:tsukurepo).permit(
      :user_id,
      :recipe_id,
      :image,
      :text,
    )
  end
end
