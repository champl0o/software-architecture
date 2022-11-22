class ConsultationSerializer
  include JSONAPI::Serializer

  belongs_to :consultation_definition
  belongs_to :user
  belongs_to :consultant, record_type: :user, serializer: UserSerializer
  attributes :id, :appointment_time, :issue, :created_at, :updated_at
end
