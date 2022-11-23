class UpdateNamesToUkrainian < ActiveRecord::Migration[7.0]
  def change
    names = ['Микола', 'Петро', 'Дмитро', 'Інна', 'Анна', 'Юлія']
    surnames = ['Шевченко', 'Франко', 'Роман', 'Кравчук', 'Малевич', 'Косач']
    User.all.each do |user|
      user.update(name: names.sample, surname: surnames.sample)
    end
  end
end
