class CreateConsultations < ActiveRecord::Migration[7.0]
  def change
    create_table :consultations do |t|
      t.references :consultation_definition, null: false, foreign_key: true
      t.datetime :appointment_time
      t.references :user, null: false, foreign_key: true
      t.references :consultant, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
