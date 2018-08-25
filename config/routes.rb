Rails.application.routes.draw do
  devise_for :users
  root 'tops#index'
  resources :recipes, except: [:edit, :update] do
    resources :comments, only: [:create]
  end
  resources :users, only: [:show, :edit, :update] do
    member do
      get 'follow'
      get 'unfollow'
    end
  end

  resources :recipes, only: [:index, :new, :create, :destroy]
  resources :users, only: [:show]
  resources :myfolders, only: [:index, :create, :destroy]
  get '/recipes/list/:id', to: 'recipes#list'
end
