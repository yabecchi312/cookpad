class SearchController < ApplicationController
  def index
    ids = Recipe.select_target_recipeid(params[:keyword])
    @recipes = Recipe.find(ids)
  end

  def show
  end
end
