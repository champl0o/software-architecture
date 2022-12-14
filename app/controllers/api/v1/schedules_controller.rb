class Api::V1::SchedulesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_schedule, only: %i[show update destroy]

  def index
    if params[:consultant_id].present?
      @schedules = Schedule.where(consultant_id: params[:consultant_id]).includes(:consultant)
      json_string = ScheduleSerializer.new(@schedules).serializable_hash.to_json
      render json: json_string
    else
      render json: { error: 'No consultant id provided' }, status: :unprocessable_entity
    end
  end

  def new
    @schedule = Schedule.new
    json_string = ScheduleSerializer.new(@schedule).serializable_hash.to_json
    render json: json_string
  end

  def edit
    json_string = ScheduleSerializer.new(@schedule).serializable_hash.to_json
    render json: json_string
  end

  def create
    @schedule = Schedule.new(schedule_params)

    if @schedule.save
      head :created
    else
      render json: @schedule.errors, status: :unprocessable_entity
    end
  end

  def update
    if @schedule.update(schedule_params)
      head :ok
    else
      render json: @schedule.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @schedule.destroy
    if @schedule.destroy
      head :ok
    else
      render json: @schedule.errors, status: :unprocessable_entity
    end
  end

  private

  def set_schedule
    @schedule = Schedule.find(params[:id])
  end

  def schedule_params
    params.require(:schedule).permit(:consultant_id, :day, :start_time, :end_time)
  end
end
