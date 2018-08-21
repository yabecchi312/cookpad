class SearchController < ApplicationController
  def index
    ids = Recipe.select_target_recipe_id(params[:keyword])
    @recipes = Recipe.find(ids)
    @keywords = params[:keyword].gsub(/　/," ").split()
  end

end
