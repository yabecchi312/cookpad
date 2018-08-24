class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :history

  def history
    recipe_ids = History.group(:recipe_id).order('id ASC').limit(5).count(:recipe_id).keys
    @histories = recipe_ids.map { |id| Recipe.find(id) }
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :avatar, :background_image, :profile])
  end
end
