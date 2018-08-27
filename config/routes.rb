Rails.application.routes.draw do
  devise_for :users
  root 'tops#index'
  resources :recipes, except: [:index] do
    collection do
      get 'recipe_rankings'
    end
    resources :comments, only: [:create]
  end
  resources :users, only: [:show, :edit, :update, :destroy] do
    member do
      get 'follow'
      get 'unfollow'
      delete 'avatar_destroy'
    end
    resources :diaries, only: [:index, :new, :create, :destroy]
  end
  resources :myfolders, only: [:index, :create, :destroy]
  get '/recipes/list/:id', to: 'recipes#list'
  resources :search, only: [:index]
end
