class Api::V1::ConsultationsController < ApplicationController
  before_action :set_consultation, only: %i[show update destroy]

  def index
    @consultations = Consultation.all
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
    params.require(:consultation).permit(:consultation_id, :rating_id, :date, :start_time, :end_time, :status)
  end
end