module Api
  module V1
    class DataController < ApplicationController
      def cities
        render json: { data: { cities: { data: [ { id: 1, name: 'Lviv' }, { id: 2, name: 'Kyiv' }, { id: 3, name: 'Kharkiv' }, { id: 4, name: 'Odesa' }] } } }.to_json
      end

      def specialisations
        render json: { data: { specialisations: { data: [ { id: 1, name: 'Nutritionist' }, { id: 2, name: 'Lawyer' }, { id: 3, name: 'Psychologist' }] } } }.to_json
      end
    end
  end
end
