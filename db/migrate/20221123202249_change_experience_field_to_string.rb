class ChangeExperienceFieldToString < ActiveRecord::Migration[7.0]
  def change
    change_column :users, :experience, :string

    User.where(specialisation: 'Nutritionist').update_all(specialisation: 'Нутриціолог')
    User.update_all(experience: 'Практикуючий спеціаліст, допомагаю людям з вирішенням їхніх проблем')
  end
end
