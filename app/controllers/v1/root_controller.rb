module V1
  class RootController < ApplicationController
    def index
      render json: { message: 'testing', status: 200 }.to_json
    end
  end
end
