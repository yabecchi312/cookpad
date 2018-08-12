class MyfoldersController < ApplicationController
  def index
    @user = User.find(current_user.id)
    @recipes = []
    @user.myfolders.each do |myfolder|
      @recipes.push(myfolder.recipe)
    end
  end
end
