class AddAttachmentProfileImageToGenres < ActiveRecord::Migration
  def self.up
    change_table :genres do |t|
      t.attachment :profile_image
    end
  end

  def self.down
    remove_attachment :genres, :profile_image
  end
end
