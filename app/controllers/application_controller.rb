class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :history

  def history
    if user_signed_in?
      ids = History.where(user_id: current_user.id).select("recipe_id").order(id: :DESC).uniq.limit(10)
      recipe_ids = ids.map{|e| e.recipe_id}
      @histories = recipe_ids.map { |id| Recipe.find(id) }
    end
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :avatar, :background_image, :profile])
  end
end
