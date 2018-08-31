class CreateTsukurepos < ActiveRecord::Migration[5.0]
  def change
    create_table :tsukurepos do |t|
      t.references :user, null: false, foreign_key: true
      t.references :recipe, null: false, foreign_key: true
      t.text :image
      t.text :text
      t.text :reply
      t.timestamps
    end
  end
end
