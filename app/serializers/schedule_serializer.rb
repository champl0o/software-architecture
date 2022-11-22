class ScheduleSerializer
  include JSONAPI::Serializer

  attributes :id, :start_time, :end_time, :day, :created_at, :updated_at, :consultant
end
