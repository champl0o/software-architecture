class CreateRatings < ActiveRecord::Migration[7.0]
  def change
    create_table :ratings do |t|
      t.integer :rating, null: true
      t.references :user

      t.timestamps
    end
  end
end
