class UpdateConsultationConsultantsToBeConsultants < ActiveRecord::Migration[7.0]
  def change
    Consultation.includes(:consultant).where(consultant: { role: 'user' }).each do |consultation|
      consultation.update(consultant: User.where(role: 'consultant').sample) if User.where(role: 'consultant').any?
    end
  end
end
