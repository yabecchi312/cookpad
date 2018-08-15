class Recipe < ApplicationRecord
  has_many :ingredients
  has_many :flows
  has_many :myfolders, dependent: :destroy
  accepts_nested_attributes_for :ingredients
  accepts_nested_attributes_for :flows
  mount_uploader :image, ImageUploader
end
