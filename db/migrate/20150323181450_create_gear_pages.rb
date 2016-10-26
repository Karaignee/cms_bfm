class CreateGearPages < ActiveRecord::Migration
  def change
    create_table :gear_pages do |t|
      t.string :name
      t.text :description
      t.references :brand, index: true
      t.references :artist, index: true
      t.references :genre, index: true
      t.string :ancestry

      t.timestamps
    end
    add_index :gear_pages, :ancestry
  end
end
