class AddUserToGear < ActiveRecord::Migration
  def change
    add_column :gear_pages, :user_id, :integer
  end
end
