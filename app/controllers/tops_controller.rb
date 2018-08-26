class TopsController < ApplicationController
  def index
    @most_viewed = Recipe.order('impressions_count DESC').take(3)
  end
end
