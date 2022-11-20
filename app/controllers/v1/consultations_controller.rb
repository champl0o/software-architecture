class Api::V1::ConsultationsController < ApplicationController
  before_action :set_consultation, only: %i[show update destroy]

  def index
    @consultations = Consultation.all
  end

  def show; end
  
  def new
    @consultation = Consultation.new
  end

  def edit; end

  def create
    @consultation = Consultation.new(consultation_params)

    if @consultation.save
      render :show, status: :created, location: @consultation
    else
      render json: @consultation.errors, status: :unprocessable_entity
    end
  end

  def update
    if @consultation.update(consultation_params)
      render :show, status: :ok, location: @consultation
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
    params.require(:consultation).permit(:user_id, :consultant_id, :rating_id, :date, :start_time, :end_time, :status)
  end
end
