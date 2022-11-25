class Api::V1::ConsultationsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_consultation, only: %i[show update destroy]
  include ActiveStorage::SetCurrent

  def index
    @consultations = Consultation.all.includes(:consultant, :user, :consultation_definition)
    json_string = ConsultationSerializer.new(@consultations).serializable_hash.to_json
    render json: json_string
  end

  def show
    json_string = ConsultationSerializer.new(@consultation).serializable_hash.to_json
    render json: json_string
  end

  def new
    @consultation = Consultation.new
    json_string = ConsultationSerializer.new(@consultation).serializable_hash.to_json
    render json: json_string
  end

  def edit
    json_string = ConsultationSerializer.new(@consultation).serializable_hash.to_json
    render json: json_string
  end

  def create
    @consultation = Consultation.new(consultation_params)

    if @consultation.save
      head :created
    else
      render json: @consultation.errors, status: :unprocessable_entity
    end
  end

  def update
    if @consultation.update(consultation_params)
      head :ok
    else
      render json: @consultation.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @consultation.destroy
  end

  private

  def set_consultation
    @consultation = Consultation.find(params[:id])
  end

  def consultation_params
    params.require(:consultation).permit(:consultation_definition_id, :user_id, :consultant_id, :appointment_time)
  end
end
