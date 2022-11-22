# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
if false
  ActiveRecord::Base.transaction do
    pp 'users'
    u1 = User.create!(name: 'Кензо', surname: 'Тенма', specialisation: 'Терапевт', education: 'УКУ',
                      experience: 10, age: 30, city: 'Львів', role: 'consultant')
    u2 = User.create!(name: 'Казума', surname: 'Кірю', username: 'kazuma', role: 'user', city: 'Львів', age: 30)
    u1.avatar.attach(io: URI.parse(Faker::Avatar.image).open, filename: 'kenzo.png')
    u2.avatar.attach(io: URI.parse(Faker::Avatar.image).open, filename: 'kazuma.png')
  
    pp 'schedules'
    sch1 = Schedule.create!(consultant: u1, day: 'monday', start_time: '10:00', end_time: '12:00')
    sch2 = Schedule.create!(consultant: u1, day: 'tuesday', start_time: '10:00', end_time: '12:00')
    sch3 = Schedule.create!(consultant: u1, day: 'wednesday', start_time: '10:00', end_time: '18:00')
  
    pp 'consultation_definitions'
    cdef1 = ConsultationDefinition.create!(consultant: u1, title: 'Терапія', duration: 60, description: 'Опис терапії')
    cdef2 = ConsultationDefinition.create!(consultant: u1, title: 'Стартова консультація', duration: 60,
                            description: 'Опис стартової консультації')
  
    pp 'consultations'
    cons1 = Consultation.create!(consultation_definition: cdef1, user: u2, consultant: u1, appointment_time: '2021-11-21 10:00:00')
    cons2 = Consultation.create!(consultation_definition: cdef2, user: u2, consultant: u1, appointment_time: '2021-11-21 11:00:00')
    сons3 = Consultation.create!(consultation_definition: cdef1, user: u2, consultant: u1, appointment_time: '2021-11-23 11:00:00')
    cons4 = Consultation.create!(consultation_definition: cdef1, user: u2, consultant: u1, appointment_time: '2021-11-22 14:00:00')
  
    pp 'users cycle'
    5.times do |i|
      u = User.create!(name: Faker::Name.first_name, surname: Faker::Name.last_name, specialisation: 'Юрист', education: 'КНУ',
        experience: 10, age: 30, city: 'Львів', role: 'consultant')
      u.avatar.attach(io: URI.parse(Faker::Avatar.image).open, filename: "user#{i}.png")
    end
    5.times do |i|
      u = User.create!(name: Faker::Name.first_name, surname: Faker::Name.last_name, specialisation: 'Nutritionist', education: 'ЖНУ',
        experience: 10, age: 30, city: 'Київ', role: 'consultant')
      u.avatar.attach(io: URI.parse(Faker::Avatar.image).open, filename: "user1#{i}.png")
    end
  end
end


ActiveRecord::Base.transaction do
  pp 'cycle'
  pp 'users cycle'
  5.times do |i|
    u = User.create!(name: Faker::Name.first_name, surname: Faker::Name.last_name, specialisation: 'Юрист', education: 'КНУ',
      experience: 10, age: 30, city: 'Львів', role: 'consultant')
    u.avatar.attach(io: URI.parse(Faker::Avatar.image).open, filename: "user#{i}.png")
  end
  5.times do |i|
    u = User.create!(name: Faker::Name.first_name, surname: Faker::Name.last_name, specialisation: 'Nutritionist', education: 'ЖНУ',
      experience: 10, age: 30, city: 'Київ', role: 'consultant')
    u.avatar.attach(io: URI.parse(Faker::Avatar.image).open, filename: "user1#{i}.png")
  end

  User.all.each do |user|
    if user.consultant?
      Schedule.create!(consultant: user, day: Schedule.days.keys.sample, start_time: '12:00', end_time: '14:00')
      cdef1 = ConsultationDefinition.create!(consultant: user, title: 'Терапія', duration: 60, description: 'Опис терапії')
      cdef2 = ConsultationDefinition.create!(consultant: user, title: 'Стартова консультація', duration: 60,
                                     description: 'Опис стартової консультації')
      cons1 = Consultation.create!(consultation_definition: cdef1, user: User.where(role: 'user').sample, consultant: user, appointment_time: '2022-11-21 10:00:00')
      cons2 = Consultation.create!(consultation_definition: cdef2, user: User.where(role: 'user').sample, consultant: user, appointment_time: '2022-11-21 11:00:00')
      сons3 = Consultation.create!(consultation_definition: cdef1, user: User.where(role: 'user').sample, consultant: user, appointment_time: '2022-11-23 11:00:00')
      cons4 = Consultation.create!(consultation_definition: cdef1, user: User.where(role: 'user').sample, consultant: user, appointment_time: '2022-11-22 14:00:00')
      5.times do
        cons4 = Consultation.create!(consultation_definition: cdef1, user: User.where(role: 'user').sample, consultant: User.where(role: 'consultant').sample, appointment_time: Faker::Time.between(from: DateTime.now, to: DateTime.now + 1))
      end
    end
  end
end