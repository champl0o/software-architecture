class AddIssueToConsultation < ActiveRecord::Migration[7.0]
  def change
    add_column :consultations, :issue, :string

    Consultation.update_all(issue: 'Мене дуже довго турбує це питання')
  end
end
