class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :history
  before_action :basic_auth


  def history
    if user_signed_in?
      ids = History.where(user_id: current_user.id).order(id: :DESC).limit(10)
      recipe_ids = ids.map{|e| e.recipe_id}.uniq
      @histories = recipe_ids.map { |id| Recipe.find(id) }
    end
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :avatar, :background_image, :profile])
  end

  private

  def basic_auth
    authenticate_or_request_with_http_basic do |username, password|
      username == 'admin' && password == '2222'
    end
  end

end
