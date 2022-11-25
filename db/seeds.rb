pp 'delete everything'
ConsultationDefinition.destroy_all
Schedule.destroy_all
Consultation.destroy_all
User.destroy_all

ActiveRecord::Base.transaction do
  pp 'users'
  u1 = User.create!(name: 'Кензо', surname: 'Тенма', specialisation: 'Терапевт', education: 'УКУ',
                    experience: 'Допомагаю людям вирішувати їх проблеми', age: 30, city: 'Львів', role: 'consultant')
  u2 = User.create!(name: 'Казума', surname: 'Кірю', username: 'kazuma', role: 'user', city: 'Львів', age: 30)
  u1.avatar.attach(io: URI.parse(Faker::Avatar.image).open, filename: 'kenzo.png')
  u2.avatar.attach(io: URI.parse(Faker::Avatar.image).open, filename: 'kazuma.png')

  Schedule.create!(consultant: u1, day: 'monday', start_time: '12:00', end_time: '14:00')
  Schedule.create!(consultant: u1, day: 'wednesday', start_time: '12:00', end_time: '14:00')
  Schedule.create!(consultant: u1, day: 'friday', start_time: '12:00', end_time: '18:00')

  cdef1 = ConsultationDefinition.create!(consultant: u1, title: 'Терапія', duration: 60, description: 'Опис терапії')
  cdef2 = ConsultationDefinition.create!(consultant: u1, title: 'Стартова консультація', duration: 60,
                                         description: 'Опис стартової консультації')

  Consultation.create!(consultation_definition: cdef2, user: u2, consultant: u1, appointment_time: '2022-11-21 10:00:00')
  Consultation.create!(consultation_definition: cdef1, user: u2, consultant: u1, appointment_time: '2022-11-21 11:00:00')
  Consultation.create!(consultation_definition: cdef1, user: u2, consultant: u1, appointment_time: '2022-11-23 11:00:00')
  Consultation.create!(consultation_definition: cdef1, user: u2, consultant: u1, appointment_time: '2022-11-25 14:00:00')

  pp 'users cycle'
  names = ['Микола', 'Петро', 'Дмитро', 'Інна', 'Анна', 'Юлія']
  surnames = ['Шевченко', 'Франко', 'Роман', 'Кравчук', 'Малевич', 'Косач']
  5.times do |i|
    u = User.create!(name: names.sample, surname: surnames.sample, specialisation: 'Юрист', education: 'КНУ',
      experience: 'Допомагаю людям вирішувати їх проблеми', age: 30, city: 'Львів', role: 'consultant')
    u.avatar.attach(io: URI.parse(Faker::Avatar.image).open, filename: "user#{i}.png")
  end
  5.times do |i|
    u = User.create!(name: names.sample, surname: surnames.sample, specialisation: 'Нутриціолог', education: 'ЖНУ',
      experience: 'Допомагаю людям вирішувати їх проблеми', age: 30, city: 'Київ', role: 'consultant')
    u.avatar.attach(io: URI.parse(Faker::Avatar.image).open, filename: "user1#{i}.png")
  end
end
