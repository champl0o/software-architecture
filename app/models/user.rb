class User < ApplicationRecord
  has_one_attached :avatar
  has_many :ratings
  has_many :consultations

  enum role: { user: 0, consultant: 1 }

  validates :age, :city, presence: true
  validates :username, presence: true, uniqueness: true, if: :user?
  validates :name, :surname, :experience, :specialisation, :education, presence: true, if: :consultant?
  validates :role, presence: true, inclusion: { in: roles.keys }
end
