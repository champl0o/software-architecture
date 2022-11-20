class Schedule < ApplicationRecord
  belongs_to :consultant, class_name: 'User'

  enum :day, { monday: 0, tuesday: 1, wednesday: 2, thursday: 3, friday: 4, saturday: 5, sunday: 6 }
  validates :day, presence: true, inclusion: { in: days.keys }
end
