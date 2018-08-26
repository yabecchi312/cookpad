Rails.application.routes.draw do
  devise_for :users
  root 'tops#index'
  resources :recipes, except: [:edit, :update]
  resources :users, only: [:show, :edit, :update] do
    member do
      get 'follow'
      get 'unfollow'
    end
    resources :diaries, only: [:index, :new, :create, :destroy]
    # get '/diaries/post', to: 'diaries#post'
  end
  resources :myfolders, only: [:index, :create, :destroy]
  get '/recipes/list/:id', to: 'recipes#list'
end
