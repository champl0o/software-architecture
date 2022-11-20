class AddRatingsToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :ratings, :float
  end
end
