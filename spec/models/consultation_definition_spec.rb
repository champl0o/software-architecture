require 'rails_helper'

RSpec.describe ConsultationDefinition, type: :model do
  describe 'associations' do
    it { should have_many(:consultations) }
  end

  describe 'validations' do
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:duration) }
  end
end
