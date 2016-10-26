class AddTagsAndLocationToUsers < ActiveRecord::Migration
  def change
    add_column :users, :tags, :string, index: true
    add_column :users, :location, :string, index: true
  end
end
