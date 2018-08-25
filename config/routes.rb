Rails.application.routes.draw do
  devise_for :users
  root 'tops#index'

  resources :recipes, except: [:edit, :update] do
    resources :comments, only: [:create]
  end
  resources :users, only: [:show, :edit, :update] do
  resources :recipes, except: [:edit, :update]
  resources :recipes, only: [:index, :new, :create, :show]
  resources :users, only: [:show, :edit, :update, :destroy] do
    member do
      get 'follow'
      get 'unfollow'
      delete 'avatar_destroy'
    end
  end
  resources :recipes, only: [:index, :new, :create, :destroy]
  resources :users, only: [:show]

  resources :myfolders, only: [:index, :create, :destroy]
  get '/recipes/list/:id', to: 'recipes#list'
  resources :search, only: [:index]
end
