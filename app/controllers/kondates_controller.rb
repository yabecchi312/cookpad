class KondatesController < ApplicationController
  def index
  end

  def new
    @kondate = Kondate.new
  end

  def recent
  end
end
