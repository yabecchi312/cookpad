Rails.application.routes.draw do
  devise_for :users
  root 'tops#index'
  resources :recipes, only: [:index, :new, :create]
  resources :users, only: [:show]
end
