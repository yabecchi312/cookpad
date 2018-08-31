class TsukureposController < ApplicationController
  protect_from_forgery except: :create

  def create
    @tsukurepo = Tsukurepo.new(tsukurepo_params)
    if @tsukurepo.save
      redirect_to controller: :recipes, action: :show, id: params.require(:tsukurepo)[:recipe_id]
    else
      redirect_to root_path
    end
  end

  def destroy
    @tsukurepo = Tsukurepo.find(params[:id])
    if @tsukurepo.destroy
      redirect_to action: "list", id: current_user.id
    else
      flash.now[:error] = "つくれぽの削除に失敗しました"
      render action: "list", id: current_user.id
    end
  end

  def list
    @user = User.find(params[:id])
    @tsukurepos = @user.tsukurepos
    @tsukurepos = Kaminari.paginate_array(@tsukurepos).page(params[:page]).per(5)
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
