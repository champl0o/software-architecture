class Api::V1::SchedulesController < ApplicationController
  before_action :set_schedule, only: %i[show update destroy]

  def index
    @schedules = Schedule.all
  end

  def new
    @schedule = Schedule.new
  end

  def edit; end

  def create
    @schedule = Schedule.new(schedule_params)

    if @schedule.save
      render :show, status: :created, location: @schedule
    else
      render json: @schedule.errors, status: :unprocessable_entity
    end
  end

  def update
    if @schedule.update(schedule_params)
      render :show, status: :ok, location: @schedule
    else
      render json: @schedule.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @schedule.destroy
  end

  private

  def set_schedule
    @schedule = Schedule.find(params[:id])
  end

  def schedule_params
    params.require(:schedule).permit(:consultant_id, :day, :start_time, :end_time)
  end
end
