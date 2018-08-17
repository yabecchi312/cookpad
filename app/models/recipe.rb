class Recipe < ApplicationRecord
  has_many :ingredients, dependent: :destroy
  has_many :flows, dependent: :destroy
  belongs_to :users
  accepts_nested_attributes_for :ingredients
  accepts_nested_attributes_for :flows
  mount_uploader :image, ImageUploader
end
