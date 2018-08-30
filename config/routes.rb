Rails.application.routes.draw do
  devise_for :users
  root 'tops#index'
  resources :recipes do
    collection do
      get 'recipe_rankings'
    end
    resources :comments, only: [:create]
  end

  resources :tsukurepos, only: [:create,:destroy]

  resources :users, only: [:show, :edit, :update, :destroy] do
    member do
      get 'follow'
      get 'unfollow'
      delete 'avatar_destroy'
    end
  end

  resources :myfolders, only: [:index, :create, :destroy]
  get '/recipes/list/:id', to: 'recipes#list'
  resources :search, only: [:index]
  resources :kondates, only: [:index,:new,:create,:show,:destroy] do
    collection do
      get :recent
      get :search
    end
  end
  get '/kondates/list/:id', to: 'kondates#list'
end
