class ChangeDatatypeDateOfDiariesCha < ActiveRecord::Migration[5.0]
  def change
    change_column :diaries, :date, :date
  end
end
