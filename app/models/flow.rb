class Flow < ApplicationRecord
  belongs_to :recipe, optional: true
  mount_uploader :image, ImageUploader
end
