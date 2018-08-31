class KondatesController < ApplicationController
  def index
    @kondates = Kondate.limit(3).includes([:user,:recipes]).order(id: :desc)
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
    @kondate = Kondate.includes([:user,:recipes]).find(params[:id])
  end

  def destroy
    @kondate = Kondate.find(params[:id])
    if @kondate.destroy
      redirect_to action: "list", id: current_user.id
    else
      flash.now[:error] = "献立の削除に失敗しました"
      render action: "list", id: current_user.id
    end
  end

  def recent
    @kondates = Kondate.includes([:user,:recipes]).order(id: :desc)
    @kondates = Kaminari.paginate_array(@kondates).page(params[:page]).per(5)
  end

  def search
    @kondates = Kondate.find(Kondate.select_target_kondate_id(params[:keyword]))
    @keywords = params[:keyword].gsub(/　/," ").split()
    @kondates = Kaminari.paginate_array(@kondates).page(params[:page]).per(5)
  end

  def list
    @user = User.find(params[:id])
    @kondates = @user.kondates.includes(:recipes)
    @kondates = Kaminari.paginate_array(@kondates).page(params[:page]).per(5)
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
