class CreateRecipeKondates < ActiveRecord::Migration[5.0]
  def change
    create_table :recipe_kondates do |t|
      t.references :kondate, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.integer :status, null: false

      t.timestamps
    end
  end
end
