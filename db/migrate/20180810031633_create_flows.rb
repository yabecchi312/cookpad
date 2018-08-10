class CreateFlows < ActiveRecord::Migration[5.0]
  def change
    create_table :flows do |t|
      t.references :recipe, null: false, foreign_key: true
      t.text :image
      t.text :text
      t.integer :order
      t.timestamps
    end
  end
end
