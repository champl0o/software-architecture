class ConsultationDefinition < ApplicationRecord
  belongs_to :consultant, class_name: 'User'
  has_many :consultations, dependent: :destroy

  validates :title, :duration, presence: true
end
