class UpdateConsultationsAndUsers < ActiveRecord::Migration[7.0]
  def change
    20.times do |i|
      u = User.create!(name: Faker::Name.first_name, surname: Faker::Name.last_name, username: "username#{i}", age: 30, city: 'Київ', role: 'user')
    end

    Consultation.all.each do |consultation|
      consultation.update(user: User.where(role: 'user').sample) if User.where(role: 'user').any?
    end
  end
end
