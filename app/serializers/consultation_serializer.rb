class ConsultationSerializer
  include JSONAPI::Serializer

  attributes :id, :appointment_time, :issue, :created_at, :updated_at, :consultation_definition, :user, :consultant
end
