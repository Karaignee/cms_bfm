class CreateUserGroups < ActiveRecord::Migration
  def change
    create_table :user_groups do |t|
      t.string :name, index: true
      t.text :description
      t.boolean :is_admin
      t.boolean :is_curator
      t.boolean :is_contributor

      t.timestamps
    end
  end
end
