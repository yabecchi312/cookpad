class Recipe < ApplicationRecord
  has_many :ingredients, dependent: :destroy
  has_many :flows, dependent: :destroy
  has_many :myfolders, dependent: :destroy
  has_many :register_users, through: :myfolders, source: :user
  has_many :histories, dependent: :destroy
  has_many :recipe_categories
  has_many :categories, through: :recipe_categories
  has_many :comments, dependent: :destroy
  belongs_to :user

  accepts_nested_attributes_for :ingredients, allow_destroy: true
  accepts_nested_attributes_for :flows, allow_destroy: true
  has_many :kondates, through: :recipe_kondates
  has_many :recipe_kondates
  mount_uploader :image, ImageUploader
  is_impressionable counter_cache: true

  #各条件で検索し、かかったrecipeのidを重複排除して配列で返す
  def self.select_target_recipe_id(keywords,user_id=0)
    target_recipe_ids = []
    keyword_arrays = keywords.gsub(/ /," ").split()
    keyword_arrays.each do |keyword|
      if user_id == 0
        sql_string = self.make_sql_string(keyword)
      else
        sql_string = self.make_sql_string_with_user_id(keyword,user_id)
      end
      target_recipe_ids.push(Recipe.find_by_sql(sql_string).map{|obj| obj[:id]})
    end
    target_recipe_ids.flatten.uniq.sort
  end

  def self.make_sql_string(keyword)
    sql_string = ""
    sql_string = 'select distinct recipes.id from recipes left join ingredients on ingredients.recipe_id = recipes.id left join flows on flows.recipe_id = recipes.id'

    where_string = "where title LIKE '%#{keyword}%' or catch_copy LIKE '%#{keyword}%' or ingredients.name LIKE '%#{keyword}%' or flows.text LIKE '%#{keyword}%'"

    sql_string = sql_string + ' ' + where_string
  end

  def self.make_sql_string_with_user_id(keyword,user_id)
    sql_string = ""
    sql_string = 'select distinct recipes.id from recipes left join ingredients on ingredients.recipe_id = recipes.id left join flows on flows.recipe_id = recipes.id'

    where_string = "where (title LIKE '%#{keyword}%' or catch_copy LIKE '%#{keyword}%' or ingredients.name LIKE '%#{keyword}%' or flows.text LIKE '%#{keyword}%') and user_id = '#{user_id}'"

    sql_string = sql_string + ' ' + where_string
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

  def register_to_history(user)
    histories.create(user_id: user.id)
  end

end
