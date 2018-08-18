Rails.application.routes.draw do
  devise_for :users
  root 'tops#index'
  resources :recipes, only: [:index, :new, :create, :show]
  resources :users, only: [:show, :edit, :update] do
    member do
      get 'follow'
      get 'unfollow'
    end
  end
  resources :recipes, only: [:index, :new, :create]
  resources :users, only: [:show]
  resources :myfolders, only: [:index, :create, :destroy]
  get '/recipes/list/:id', to: 'recipes#list'
end
