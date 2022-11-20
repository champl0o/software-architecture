require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'associations' do
    it { should have_many(:consultations) }
  end

  describe 'validations' do
    it { should validate_presence_of(:age) }
    it { should validate_presence_of(:city) }
    it { should validate_presence_of(:role) }
    it { should define_enum_for(:role).with_values(%i[user consultant]) }
  end

  describe 'user validations' do
    before { allow(subject).to receive(:user?).and_return(true) }
    it { should validate_presence_of(:username) }
    it { should validate_uniqueness_of(:username) }
  end

  describe 'consultant validations' do
    before { allow(subject).to receive(:consultant?).and_return(true) }
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:surname) }
    it { should validate_presence_of(:experience) }
    it { should validate_presence_of(:specialisation) }
    it { should validate_presence_of(:education) }
  end
end
