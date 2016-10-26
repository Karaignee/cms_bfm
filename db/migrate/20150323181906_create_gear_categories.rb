class CreateGearCategories < ActiveRecord::Migration
  def change
    create_table :gear_categories do |t|
      t.string :name
      t.text :description
      t.references :gear_page, index: true

      t.timestamps
    end
  end
end
