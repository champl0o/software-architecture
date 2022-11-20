require 'rails_helper'

RSpec.describe Consultation, type: :model do
  describe 'associations' do
    it { should belong_to(:consultation_definition) }
    it { should belong_to(:user) }
    it { should belong_to(:consultant).class_name('User') }
  end

  describe 'validations' do
    it { should validate_presence_of(:appointment_time) }
  end
end
