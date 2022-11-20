class User < ApplicationRecord
  has_one_attached :avatar
  has_many :consultations
  has_many :schedules, foreign_key: 'consultant_id', class_name: 'Schedule'
  has_many :consultation_definitions, foreign_key: 'consultant_id', class_name: 'ConsultationDefinition'

  enum role: { user: 0, consultant: 1 }

  validates :age, :city, presence: true
  validates :username, presence: true, uniqueness: true, if: :user?
  validates :name, :surname, :experience, :specialisation, :education, presence: true, if: :consultant?
  validates :role, presence: true, inclusion: { in: roles.keys }
  validates :age, numericality: { greater_than_or_equal_to: 6, less_than_or_equal_to: 100 }

  class << self
    def search(query = nil, filter = nil, sort = nil)
      users = User.all
      users = users.where("name ILIKE :query OR surname ILIKE :query", query: "%#{query}%") if query.present?
      users = users.where("ratings >= :filter", filter: filter) if filter.present?

      # Не обовязково додавати всі поля, я просто так написав на всі випадки
      case sort
      when 'name'
        users.order(:name)
      when 'surname'
        users.order(:surname)
      when 'age'
        users.order(:age)
      when 'city'
        users.order(:city)
      when 'experience'
        users.order(:experience)
      when 'specialisation'
        users.order(:specialisation)
      when 'education'
        users.order(:education)
      when 'ratings'
        users.order(:ratings)
      else
        users
      end
    end
  end
end
