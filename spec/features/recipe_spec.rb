require 'rails_helper'
feature 'recipe', type: :feature do
  let(:user) { create(:user) }

  scenario 'post recipe' do
    # ログイン前には投稿ボタンがない
    visit root_path
    expect(page).to have_no_link('レシピを書く')

    # ログイン処理
    visit new_user_session_path
    fill_in 'user_email', with: user.email
    fill_in 'user_password', with: user.password
    find('input[name="commit"]').click
    expect(current_path).to eq root_path
    expect(page).to have_link('レシピを書く')

    # レシピを投稿する
    expect {
      click_link('レシピを書く')
      expect(current_path).to eq new_recipe_path
      fill_in 'recipe_title', with: 'さつまいも'
      fill_in 'recipe_catch_copy', with: 'さつまいも'
      find('input[class="recipe_submit_button"]','保存する').click
    }.to change(Recipe, :count).by(1)
  end
end
