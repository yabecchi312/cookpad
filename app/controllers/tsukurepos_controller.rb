class TsukureposController < ApplicationController

  def create
    @tsukurepo = Tsukurepo.new(tsukurepo_params)
    if @tsukurepo.save
      redirect_to controller: :recipes, action: :show, id: params.require(:tsukurepo)[:recipe_id]
    else
      redirect_to root_path
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
