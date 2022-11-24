class Api::V1::UsersController < ApplicationController
  include ActiveStorage::SetCurrent
  before_action :set_user, only: %i[show update destroy]

  def index
    @users = User.all.includes(:consultations, :schedules)
    users_json = UserSerializer.new(@users).serializable_hash.to_json
    render json: users_json
  end

  def show
    json_string = UserSerializer.new(@user).serializable_hash.to_json
    render json: json_string
  end

  def new
    @user = User.new
    json_string = UserSerializer.new(@user).serializable_hash.to_json
    render json: json_string
  end

  def edit
    json_string = UserSerializer.new(@user).serializable_hash.to_json
    render json: json_string
  end

  def create
    @user = User.new(user_params)

    if @user.save
      head :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update
    if @user.update(user_params)
      head :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def search
    @users = User.search(params[:search], params[:filter], params[:sort])
    users_json = UserSerializer.new(@users).serializable_hash.to_json
    render json: users_json
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :age, :city, :email, :username, :surname, :experience, :specialisation, :education, :ratings)
  end
end
