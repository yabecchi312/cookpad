class Recipe < ApplicationRecord
  has_many :ingredients
  has_many :flows
  belongs_to :users
  accepts_nested_attributes_for :ingredients
  accepts_nested_attributes_for :flows
  mount_uploader :image, ImageUploader
end
