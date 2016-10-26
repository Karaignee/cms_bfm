class AddAttachmentProfileImageToArtists < ActiveRecord::Migration
  def self.up
    change_table :artists do |t|
      t.attachment :profile_image
    end
  end

  def self.down
    remove_attachment :artists, :profile_image
  end
end
