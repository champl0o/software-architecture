class ConsultationDefinition < ApplicationRecord
  validates :title, :duration, presence: true
end
