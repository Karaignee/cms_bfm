class CreatePreRegistrations < ActiveRecord::Migration
  def change
    create_table :pre_registrations do |t|
      t.string :email
      t.string :ip_address
      t.string :source

      t.timestamps
    end
  end
end
