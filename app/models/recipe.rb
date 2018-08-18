class Recipe < ApplicationRecord
  has_many :ingredients
  has_many :flows
  has_many :myfolders, dependent: :destroy
  has_many :register_users, through: :myfolders, source: :user
  belongs_to :users
  accepts_nested_attributes_for :ingredients
  accepts_nested_attributes_for :flows
  mount_uploader :image, ImageUploader


  #各条件で検索し、かかったrecipeのidを重複排除して配列で返す
  def self.select_target_recipeid(keywords)
    target_recipe_ids = []
    keyword_arrays = keywords.gsub(/　/," ").split()
    keyword_arrays.each do |keyword|
      sql_string = ""
      sql_string = 'select distinct recipes.id from recipes left join ingredients on ingredients.recipe_id = recipes.id left join flows on flows.recipe_id = recipes.id'

      where_string = "where title LIKE '%#{keyword}%' or catch_copy LIKE '%#{keyword}%' or ingredients.name LIKE '%#{keyword}%' or flows.text LIKE '%#{keyword}%'"

      sql_string = sql_string + ' ' + where_string
      target_recipe_ids.push(Recipe.find_by_sql(sql_string).map{|obj| obj[:id]})
    end
    target_recipe_ids.flatten.uniq.sort
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
