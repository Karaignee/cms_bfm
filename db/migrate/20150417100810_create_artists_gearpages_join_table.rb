class CreateArtistsGearpagesJoinTable < ActiveRecord::Migration
  def change
  	create_table :artists_gear_pages, id: false do |t|
  		t.integer :artist_id
  		t.integer :gear_page_id
  	end

  	add_index :artists_gear_pages, :artist_id
  	add_index :artists_gear_pages, :gear_page_id
  end

end


