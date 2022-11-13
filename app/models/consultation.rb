class Consultation < ApplicationRecord
  belongs_to :consultation_definition
  belongs_to :user
  belongs_to :consultant, class_name: 'User'

  validates :appointment_time, presence: true
end
