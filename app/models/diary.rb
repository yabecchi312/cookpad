class Diary < ApplicationRecord
  belongs_to :users
  self.inheritance_column = :_type_disabled
  mount_uploader :image, ImageUploader
end
