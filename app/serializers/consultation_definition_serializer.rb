class ConsultationDefinitionSerializer
  include JSONAPI::Serializer

  belongs_to :consultant, record_type: :user, serializer: UserSerializer
  has_many :consultations
  attributes :id, :title, :duration, :description, :created_at, :updated_at
end
