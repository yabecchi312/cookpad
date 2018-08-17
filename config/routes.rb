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
  get '/recipes/list/:id', to: 'recipes#list'
  resources :diarys, only: [:index, :new, :create]
  get 'diarys/new/:id', to: 'diarys#new'
end
