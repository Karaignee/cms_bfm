class AddSoftwareVersionsToPreRegistrations < ActiveRecord::Migration
  def change
    add_column :pre_registrations, :user_agent, :string, index: true
  end
end
