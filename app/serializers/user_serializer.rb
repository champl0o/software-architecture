class UserSerializer
  include JSONAPI::Serializer
  include Rails.application.routes.url_helpers

  has_many :consultations
  has_many :schedules
  attributes :id, :name, :surname, :username, :age, :city, :experience, :specialisation, :education, :ratings, :role,
             :created_at, :updated_at

  attributes :avatar_url do |object|
    object.avatar.url
  end
end
