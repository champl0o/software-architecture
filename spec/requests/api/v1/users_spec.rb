require 'rails_helper'

RSpec.describe "Api::V1::Users", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/api/v1/users/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    let(:user) { create(:user) }
    it "returns http success" do
      get "/api/v1/users/show/#{user.id}"
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST /create" do
    it "returns http created" do
      post "/api/v1/users", params: { user: attributes_for(:user) }
      expect(response).to have_http_status(:created)
    end

    describe "when params are invalid" do
      context "when no name is provided" do        
        it "returns http unprocessable_entity" do
          post "/api/v1/users", params: { user: { role: :consultant } }
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      context "when no age is provided" do
        it "returns http unprocessable_entity" do
          post "/api/v1/users", params: { user: attributes_for(:user, age: nil) }
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      context "when age is more that required" do
        it "returns http unprocessable_entity" do
          post "/api/v1/users", params: { user: attributes_for(:user, age: 101) }
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      context "when age is less that required" do
        it "returns http unprocessable_entity" do
          post "/api/v1/users", params: { user: attributes_for(:user, age: 0) }
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      context "when age is lower 0" do
        it "returns http unprocessable_entity" do
          post "/api/v1/users", params: { user: attributes_for(:user, age: -1) }
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      context "when no city is provided" do
        it "returns http unprocessable_entity" do
          post "/api/v1/users", params: { user: attributes_for(:user, city: nil) }
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    describe 'when params are invalid for consultant role' do
      context 'when no experience is provided' do
        it 'returns http unprocessable_entity' do
          post "/api/v1/users", params: { user: { role: :consultant } }
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      context 'when no specialisation is provided' do
        it 'returns http unprocessable_entity' do
          post "/api/v1/users", params: { user: { role: :consultant } }
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end

      context 'when no education is provided' do
        it 'returns http unprocessable_entity' do
          post "/api/v1/users", params: { user: { role: :consultant } }
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    describe 'when params are invalid for user role' do
      context 'when no username is provided' do
        it 'returns http unprocessable_entity' do
          post "/api/v1/users", params: { user: attributes_for(:user, username: nil) }
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end
  end

  describe "PUT /update" do
    let(:user) { create(:user) }
    it "returns http ok" do
      put "/api/v1/users/#{user.id}", params: { user: attributes_for(:user) }
      expect(response).to have_http_status(:ok)
    end

    describe 'when params are invalid for user role' do
      context 'when no username is provided' do
        it 'returns http unprocessable_entity' do
          put "/api/v1/users/#{user.id}", params: { user: attributes_for(:user, username: nil) }
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end
  end
end
