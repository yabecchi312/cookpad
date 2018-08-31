Rails.application.routes.draw do
  devise_for :users
  root 'tops#index'
  resources :recipes do
    collection do
      get 'recipe_rankings'
    end
    resources :comments, only: [:create]
  end
  get '/recipes/list/:id', to: 'recipes#list'

  resources :tsukurepos, only: [:create,:destroy]
  get '/tsukurepos/list/:id', to: 'tsukurepos#list'

  resources :users, only: [:show, :edit, :update, :destroy] do
    member do
      get 'follow'
      get 'unfollow'
      delete 'avatar_destroy'
      get 'followings'
      get 'followers'
    end
  end
  resources :diaries, only: [:index, :new, :create, :destroy]
  resources :myfolders, only: [:index, :create, :destroy]
  resources :search, only: [:index]
  resources :kondates, only: [:index,:new,:create,:show,:destroy] do
    collection do
      get :recent
      get :search
    end
  end
  get '/kondates/list/:id', to: 'kondates#list'
  get '/recipes/list/:id', to: 'recipes#list'
end
