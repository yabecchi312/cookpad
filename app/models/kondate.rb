class Kondate < ApplicationRecord
  has_many :recipes, through: :recipe_kondates
  has_many :recipe_kondates , dependent: :destroy
  belongs_to :user

  accepts_nested_attributes_for :recipe_kondates

  mount_uploader :image, ImageUploader

  # 検索ワードでレシピと献立のタイトルを検索し、かかった献立idを配列で返す
  def self.select_target_kondate_id(keyword)
    recipe_ids = Recipe.select_target_recipe_id(keyword)
    kondate_ids = RecipeKondate.where("recipe_id IN (?)",recipe_ids).select(:kondate_id).map{|obj| obj[:kondate_id]}
    kondate_ids |= Kondate.select(:id).where("title LIKE '%#{keyword}%'").map{|obj| obj[:id]}
    kondate_ids.sort
  end
end
