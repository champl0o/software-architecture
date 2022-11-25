class Api::V1::ConsultationDefinitionsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_consultation_definition, only: %i[show update destroy]

  def index
    @consultation_definitions = ConsultationDefinition.all.includes(:consultations, :consultant)
    json_string = ConsultationDefinitionSerializer.new(@consultation_definitions).serializable_hash.to_json
    render json: json_string
  end

  def show
    json_string = ConsultationDefinitionSerializer.new(@consultation_definition).serializable_hash.to_json
    render json: json_string
  end

  def new
    @consultation_definition = ConsultationDefinition.new
    json_string = ConsultationDefinitionSerializer.new(@consultation_definition).serializable_hash.to_json
    render json: json_string
  end

  def edit
    json_string = ConsultationDefinitionSerializer.new(@consultation_definition).serializable_hash.to_json
    render json: json_string
  end

  def create
    @consultation_definition = ConsultationDefinition.new(consultation_definition_params)

    if @consultation_definition.save
      head :created
    else
      render json: @consultation_definition.errors, status: :unprocessable_entity
    end
  end

  def update
    if @consultation_definition.update(consultation_definition_params)
      head :ok
    else
      render json: @consultation_definition.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @consultation_definition.destroy
      head :ok
    else
      render json: @consultation_definition.errors, status: :unprocessable_entity
    end
  end

  private

  def set_consultation_definition
    @consultation_definition = ConsultationDefinition.find(params[:id])
  end

  def consultation_definition_params
    params.require(:consultation_definition).permit(:consultant_id, :title, :duration, :description)
  end
end
