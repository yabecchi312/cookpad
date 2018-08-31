class ChangeDatatypeDateOfDiaries < ActiveRecord::Migration[5.0]
  def change
    change_column :diaries, :date, :datetime
  end
end
