Rails.application.routes.draw do
  get '*path', to: 'static#index', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
  root 'static#index'

  namespace :api do
    namespace :v1, defaults: { format: 'json' } do
      get 'test', to: 'root#index'

      resources :consultations, only: %i[index show create update destroy]
      resources :consultation_definitions, only: %i[index show create update destroy]
      resources :ratings, only: %i[create update]
      resources :users, only: %i[index show create update destroy]
      resources :schedules, only: %i[index create update destroy]
    end
  end
end
