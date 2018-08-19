Rails.application.routes.draw do
  devise_for :users
  root 'tops#index'
  resources :recipes, except: [:index]
  resources :users, only: [:show, :edit, :update] do
    member do
      get 'follow'
      get 'unfollow'
    end
  end
  resources :myfolders, only: [:index, :create, :destroy]
  get '/recipes/list/:id', to: 'recipes#list'
  resources :search, only: [:index]
end
