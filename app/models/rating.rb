class Rating < ApplicationRecord
  belongs_to :user

  validates :ratins, presence: true, inclusion: { in: 1..5 }
end
