class UserSerializer
  include JSONAPI::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :surname, :username, :age, :city, :experience, :specialisation, :education, :ratings, :role,
             :created_at, :updated_at, :consultations, :schedules

  attributes :avatar_url do |object|
    object.avatar.url
  end
end
