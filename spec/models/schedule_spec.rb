require 'rails_helper'

RSpec.describe Schedule, type: :model do
  describe 'associations' do
    it { should belong_to(:consultant).class_name('User') }
  end

  describe 'validations' do
    it { should validate_presence_of(:day) }
    it { should define_enum_for(:day).with_values(%i[monday tuesday wednesday thursday friday saturday sunday]) }
  end

  describe 'methods' do
    let(:days) { { monday: '14:00 - 16:00' } }
    let(:schedule) { create(:schedule) }
    it '#update_schedules' do
      expect(schedule.update_schedules(days)).to eq(days)
    end
  end
end
