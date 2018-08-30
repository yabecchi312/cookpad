class CreateDiaries < ActiveRecord::Migration[5.0]
  def change
    create_table :diaries do |t|
      t.text :title
      t.text :date
      t.text :image
      t.text :text
      t.string :type
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
