class ConsultationDefinitionSerializer
  include JSONAPI::Serializer

  attributes :id, :title, :duration, :description, :created_at, :updated_at, :consultant, :consultations
end
