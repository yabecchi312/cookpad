class Tsukurepo < ApplicationRecord
  belongs_to :user
  belongs_to :recipe

  mount_uploader :image, ImageUploader
end
