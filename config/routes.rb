Rails.application.routes.draw do
  get '*path', to: 'static#index', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
  root 'static#index'

  namespace :v1, defaults: { format: 'json' } do
    get 'test', to: 'root#index'
  end
end
