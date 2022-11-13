class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.integer :role, default: 0
      t.string :name
      t.string :surname
      t.integer :age, default: 0
      t.string :city
      t.string :specialisation
      t.string :education
      t.string :experience
      t.string :username

      t.timestamps
    end
  end
end
