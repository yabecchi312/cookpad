class SearchController < ApplicationController
  def index
    @recipes = Recipe.search(params)
  end

  def show
  end
end
