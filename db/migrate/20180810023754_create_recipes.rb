class CreateRecipes < ActiveRecord::Migration[5.0]
  def change
    create_table :recipes do |t|
      t.string :title
      t.text :catch_copy
      t.text :image
      t.text :tips
      t.text :background
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
