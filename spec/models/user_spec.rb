require 'rails_helper'
describe User do
  describe '#create' do
    it "is invalid without a name" do
     user = User.new(name: "", email: "kkk@gmail.com", password: "00000000", password_confirmation: "00000000")
     user.valid?
     expect(user.errors[:name]).to include("を入力してください")
    end
  end
end
