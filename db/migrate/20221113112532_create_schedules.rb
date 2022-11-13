class CreateSchedules < ActiveRecord::Migration[7.0]
  def change
    create_table :schedules do |t|
      t.references :consultant, null: false, foreign_key: { to_table: :users }
      t.time :start_time, null: false
      t.time :end_time, null: false
      t.integer :day, default: 0

      t.timestamps
    end
  end
end
