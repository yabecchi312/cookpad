Rails.application.routes.draw do
  devise_for :users
  root 'tops#index'
  resources :recipes, only: [:index, :new,:create]
  resources :users, only: [:show, :edit, :update] do
    member do
      get 'follow'
      get 'unfollow'
    end
  end
<<<<<<< HEAD
  resources :recipes, except: [:show, :edit, :update]
=======

  resources :recipes, only: [:index, :new, :create, :destroy]
  resources :recipes, only: [:index, :new, :create]
  resources :users, only: [:show]
  resources :myfolders, only: [:index, :create, :destroy]
>>>>>>> origin/recipe-delete-function
  get '/recipes/list/:id', to: 'recipes#list'
end
