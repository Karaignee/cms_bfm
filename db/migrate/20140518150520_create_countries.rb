class CreateCountries < ActiveRecord::Migration
  def change
    create_table :countries do |t|
      t.string :name, index: true
      t.boolean :in_the_eu, index: true
      t.integer :running_order, index: true
      t.string :iso_code
      t.string :country_tld

      t.timestamps
    end
  end
end
