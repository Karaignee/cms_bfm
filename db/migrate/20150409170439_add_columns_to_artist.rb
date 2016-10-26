class AddColumnsToArtist < ActiveRecord::Migration
  def change
    add_column :artists, :description, :text
    add_reference :artists, :gear, index: true
  end
end
