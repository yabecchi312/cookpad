Rails.application.routes.draw do
  devise_for :users
  root 'tops#index'
  resources :recipes, only: [:index, :new]
  resources :users, only: [:show] do
    member do
      get 'follow'
      get 'unfollow'
    end
  end
end
