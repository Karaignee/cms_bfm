class AddAttachmentProfileImageToBrands < ActiveRecord::Migration
  def self.up
    change_table :brands do |t|
      t.attachment :profile_image
    end
  end

  def self.down
    remove_attachment :brands, :profile_image
  end
end
