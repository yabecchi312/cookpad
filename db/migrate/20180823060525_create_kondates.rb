class CreateKondates < ActiveRecord::Migration[5.0]
  def change
    create_table :kondates do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.text :image
      t.text :point
      t.text :tips
      t.integer :cooking_time
      t.timestamps
    end
  end
end
