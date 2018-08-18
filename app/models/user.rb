class User < ApplicationRecord
  acts_as_followable #フォローされる
  acts_as_follower #フォローする
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  mount_uploader :avatar, ImageUploader
  has_many :myfolders, dependent: :destroy
  has_many :recipes
  has_many :diaries
  validates :name, length: {maximum: 10}

end
