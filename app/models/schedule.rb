class Schedule < ApplicationRecord
  attr_accessor :schedules

  belongs_to :consultant, class_name: 'User'

  enum :day, { monday: 0, tuesday: 1, wednesday: 2, thursday: 3, friday: 4, saturday: 5, sunday: 6 }

  def update_schedules(days)
    days.each do |day|
      schedules.merge(day)
    end
  end
end
