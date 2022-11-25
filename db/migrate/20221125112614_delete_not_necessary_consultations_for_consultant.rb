class DeleteNotNecessaryConsultationsForConsultant < ActiveRecord::Migration[7.0]
  def change
    User.find(1).consultations.destroy_all

    ActiveRecord::Base.transaction do
      Consultation.create!(consultation_definition: ConsultationDefinition.where(title: 'Стартова консультація').first, user: User.where(role: 'user').sample, consultant: User.find(1), appointment_time: '2022-11-21 10:00:00')
      Consultation.create!(consultation_definition: ConsultationDefinition.where(title: 'Терапія').first, user: User.where(role: 'user').sample, consultant: User.find(1), appointment_time: '2022-11-21 11:00:00')
      Consultation.create!(consultation_definition: ConsultationDefinition.where(title: 'Терапія').first, user: User.where(role: 'user').sample, consultant: User.find(1), appointment_time: '2022-11-23 11:00:00')
      Consultation.create!(consultation_definition: ConsultationDefinition.where(title: 'Терапія').first, user: User.where(role: 'user').sample, consultant: User.find(1), appointment_time: '2022-11-22 14:00:00')
    end
  end
end
