module Api
  module V1
    class DataController < ApplicationController
      def cities
        render json: { data: { cities: { data: [ { id: 1, name: 'Львів' }, { id: 2, name: 'Київ' }, { id: 3, name: 'Харків' }, { id: 4, name: 'Одеса' }] } } }.to_json
      end

      def specialisations
        render json: { data: { specialisations: { data: [ { id: 1, name: 'Нутриціолог' }, { id: 2, name: 'Юрист' }, { id: 3, name: 'Психолог' }] } } }.to_json
      end
    end
  end
end
