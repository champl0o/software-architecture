class ScheduleSerializer
  include JSONAPI::Serializer

  belongs_to :consultant, record_type: :user, serializer: UserSerializer
  attributes :id, :start_time, :end_time, :day
end
