class Api::V1::RatingsController < ApplicationController

  def create
    Rating.create!(rating_params)
  end

  def update
    Rating.find(params[:id]).update!(rating_params)
  end

  private

  def rating_params
    params.require(:rating).permit(:rating, :user_id)
  end
end
