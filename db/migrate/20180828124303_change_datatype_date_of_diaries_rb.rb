class ChangeDatatypeDateOfDiariesRb < ActiveRecord::Migration[5.0]
  def change
    change_column :diaries, :date, :string
  end
end
