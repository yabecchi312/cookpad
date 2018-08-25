class KondatesController < ApplicationController
  def index
    @kondates = Kondate.limit(3)
  end

  def new
    @kondate = Kondate.new
    @kondate.recipe_kondates.build
    @user = User.find(current_user.id)
  end

  def create
    @kondate = Kondate.new(create_params)
    if @kondate.save
      redirect_to kondates_path, notice: '献立を作成しました'
    else
      render :new
    end
  end

  def show
  end

  def recent
    @kondates = Kondate.all
  end


  private

  def create_params
    params.require(:kondate).permit(
      :title,
      :image,
      :point,
      :tips,
      :cooking_time,
      recipe_kondates_attributes: [ :recipe_id , :status ],
      ).merge(user_id: current_user.id)
  end
end
