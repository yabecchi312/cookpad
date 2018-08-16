class SearchController < ApplicationController
  def index
    @recipes = Recipe.search(params)
    byebug
  end

  def show
  end
end
