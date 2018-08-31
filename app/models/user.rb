class User < ApplicationRecord
  acts_as_followable #フォローされる
  acts_as_follower #フォローする
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  mount_uploader :avatar, ImageUploader
  mount_uploader :background_image, ImageUploader
  validates :name, length: {maximum: 10}

  has_many :recipes, dependent: :destroy
  has_many :myfolders, dependent: :destroy
  has_many :diaries, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :histories, dependent: :destroy
  has_many :kondates
  has_many :tsukurepos
end
