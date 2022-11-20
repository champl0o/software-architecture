class Api::V1::ConsultationDefinitionsController < ApplicationController
  before_action :set_consultation_definition, only: %i[show update destroy]

  def index
    @consultation_definitions = ConsultationDefinition.all
  end
  
  def show; end

  def new
    @consultation_definition = ConsultationDefinition.new
  end

  def edit; end

  def create
    @consultation_definition = ConsultationDefinition.new(consultation_definition_params)

    if @consultation_definition.save
      render :show, status: :created, location: @consultation_definition
    else
      render json: @consultation_definition.errors, status: :unprocessable_entity
    end
  end

  def update
    if @consultation_definition.update(consultation_definition_params)
      render :show, status: :ok, location: @consultation_definition
    else
      render json: @consultation_definition.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @consultation_definition.destroy
  end

  private

  def set_consultation_definition
    @consultation_definition = ConsultationDefinition.find(params[:id])
  end

  def consultation_definition_params
    params.require(:consultation_definition).permit(:consultant_id, :day, :start_time, :end_time)
  end
end
