class ConsultationDefinition < ApplicationRecord
  belongs_to :consultant, class_name: 'User'
  has_many :consultations

  validates :title, :duration, presence: true
end
