Rails.application.routes.draw do
  root 'static#index'

  namespace :api do
    namespace :v1 do
      get 'test', to: 'root#index'

      resources :consultations, only: %i[index show create update destroy]
      resources :consultation_definitions, only: %i[index show create update destroy]
      resources :users, only: %i[index show create update destroy] do
        get 'search', on: :collection
      end
      resources :schedules, only: %i[index create update destroy]
      resources :data, only: [] do
        get 'cities', on: :collection
        get 'specialisations', on: :collection
      end
    end
  end

  get '*path', to: 'static#index', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
