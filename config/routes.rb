Rails.application.routes.draw do
  root 'tops#index'
  resources :recipes, only: [:index, :new]
end
