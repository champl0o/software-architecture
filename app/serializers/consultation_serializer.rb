class ConsultationSerializer
  include JSONAPI::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :appointment_time, :issue, :created_at, :updated_at, :consultation_definition

  attributes :user do |object|
    UserSerializer.new(object.user)
  end

  attributes :consultant do |object|
    UserSerializer.new(object.consultant)
  end
end
