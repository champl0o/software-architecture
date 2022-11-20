class AddUserToConsultationDefinition < ActiveRecord::Migration[7.0]
  def change
    add_reference :consultation_definitions, :consultant, null: false, foreign_key: { to_table: :users }
  end
end
