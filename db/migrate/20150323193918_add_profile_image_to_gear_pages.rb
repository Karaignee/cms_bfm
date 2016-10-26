class AddProfileImageToGearPages < ActiveRecord::Migration
  def self.up
    add_attachment :gear_pages, :profile_image
  end

  def self.down
    remove_attachment :gear_pages, :profile_image
  end
end
