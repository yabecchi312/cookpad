class Kondate < ApplicationRecord
  has_many :recipes, through: :recipe_kondates
  has_many :recipe_kondates
  belongs_to :user

  accepts_nested_attributes_for :recipe_kondates

  mount_uploader :image, ImageUploader
end
