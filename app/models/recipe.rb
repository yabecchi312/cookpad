class Recipe < ApplicationRecord
  has_many :ingredients
  has_many :flows
  has_many :myfolders, dependent: :destroy
  accepts_nested_attributes_for :ingredients
  accepts_nested_attributes_for :flows
  mount_uploader :image, ImageUploader

  def register_to_myfolder
    myfolders.create(user_id: user.id)
  end

  def unregister_from_myfolder
    myfolders.find_by(user_id: user.id).destroy
  end
end
