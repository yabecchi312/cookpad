class Recipe < ApplicationRecord
  has_many :ingredients
  has_many :flows
  has_many :myfolders, dependent: :destroy
  has_many :register_users, through: :myfolders, source: :user
  accepts_nested_attributes_for :ingredients
  accepts_nested_attributes_for :flows
  mount_uploader :image, ImageUploader

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
