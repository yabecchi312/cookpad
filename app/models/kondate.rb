class Kondate < ApplicationRecord
  has_many :recipes, through: :recipe_kondates
  has_many :recipe_kondates

  mount_uploader :image, ImageUploader
end
