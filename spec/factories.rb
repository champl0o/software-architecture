FactoryBot.define do
  factory :user do
    age { Faker::Number.between(from: 18, to: 100) }
    city { Faker::Address.city }
    username { Faker::Internet.username }
    name { Faker::Name.first_name }
    surname { Faker::Name.last_name }
    experience { Faker::Number.between(from: 1, to: 50) }
    specialisation { Faker::Job.field }
    education { Faker::Educator.degree }
    role { :user }
  end

  factory :consultant, class: 'User' do
    age { Faker::Number.between(from: 18, to: 100) }
    city { Faker::Address.city }
    username { Faker::Internet.username }
    name { Faker::Name.first_name }
    surname { Faker::Name.last_name }
    experience { Faker::Number.between(from: 1, to: 50) }
    specialisation { Faker::Job.field }
    education { Faker::Educator.degree }
    role { :consultant }
  end

  factory :schedule do
    day { :monday }
    start_time { Faker::Time.between(from: DateTime.now - 1, to: DateTime.now) }
    end_time { Faker::Time.between(from: DateTime.now, to: DateTime.now + 1) }
    association :consultant, factory: :consultant
  end

  factory :consultation_definition do
    title { Faker::Job.title }
    duration { Faker::Number.between(from: 1, to: 10) }
  end

  factory :consultation do
    appointment_time { Faker::Time.between(from: DateTime.now - 1, to: DateTime.now) }
    association :consultation_definition
    association :user
    association :consultant, factory: :consultant
  end
end