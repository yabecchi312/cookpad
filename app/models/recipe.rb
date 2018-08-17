class Recipe < ApplicationRecord
  has_many :ingredients
  has_many :flows
  has_many :myfolders, dependent: :destroy
  has_many :register_users, through: :myfolders, source: :user
  belongs_to :users
  accepts_nested_attributes_for :ingredients
  accepts_nested_attributes_for :flows
  mount_uploader :image, ImageUploader

  def self.search(params)
    params[:keyword] ||= ""
    keyword_arrays = params[:keyword].gsub(/　/," ").split()
    query_string = ""
    keyword_arrays.each_with_index do |keyword,i|
      if i == 0
        query_string += "("
      end

      query_string += "`recipes`.`title` LIKE \'\%#{keyword}\%\'"

      if i == keyword_arrays.length - 1
        query_string += ")"
      else
        query_string += ' OR '
      end
    end

    # arelを使うタイプは一旦コメントアウトしておく
    # recipes = Recipe.arel_table[:title]
    # recipes_sel = recipes.matches("\%#{keyword_arrays[0]}\%")
    # for i in 1...keyword_arrays.length
    #   recipes_sel = recipes_sel.or(recipes.matches("\%#{keyword_arrays[i]}\%"))
    # end
    # logger.debug("SQL: #{Recipe.where(recipes_sel).to_sql}")

    Recipe.where(query_string)
  end

  def register_to_myfolder(user)
    myfolders.create(user_id: user.id)
  end

  def unregister_from_myfolder(user)
    myfolders.find_by(user_id: user.id).destroy
  end

  def register_to_myfolder?(user)
    register_users.include?(user)
  end
end
