require 'rails_helper'

RSpec.describe "Api::V1::ConsultationDefinitions", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/api/v1/consultation_definitions/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    let(:consultation_definition) { create(:consultation_definition) }
    it "returns http success" do
      get "/api/v1/consultation_definitions/show/#{consultation_definition.id}"
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST /create" do
    let(:params) { { consultation_definition: attributes_for(:consultation_definition) } }

    it "returns http created" do
      post "/api/v1/consultation_definitions", params: params
      expect(response).to have_http_status(:created)
    end

    context "when params are invalid" do
      let(:params) { { consultation_definition: attributes_for(:consultation_definition, title: nil) } }

      it "returns http unprocessable_entity" do
        post "/api/v1/consultation_definitions", params: params
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "PUT /update" do
    let(:params) { { consultation_definition: {title: 'gjgjjg'} } }
    let(:consultation_definition) { create(:consultation_definition) }

    it "returns http success" do
      put "/api/v1/consultation_definitions/#{consultation_definition.id}", params: params
      expect(response).to have_http_status(:ok)
      consultation_definition.reload
      expect(consultation_definition.title).to eq('gjgjjg')
    end

    context "when params are invalid" do
      let(:params) { { consultation_definition: attributes_for(:consultation_definition, title: nil) } }

      it "returns http unprocessable_entity" do
        post "/api/v1/consultation_definitions", params: params
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "DELETE /destroy" do
    it "returns http no content" do
      consultation_definition = create(:consultation_definition)
      delete "/api/v1/consultation_definitions/#{consultation_definition.id}"
      expect(response).to have_http_status(:no_content)
    end
  end
end
