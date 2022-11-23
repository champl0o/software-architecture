class ScheduleSerializer
  include JSONAPI::Serializer

  attributes :id, :start_time, :end_time, :created_at, :updated_at, :consultant

  attribute :day do |object|
    object.day.capitalize
  end

  attribute :slots do |object|
    (object.start_time.to_s(:time).to_i...object.end_time.to_s(:time).to_i).to_a
  end
end
