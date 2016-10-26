class AddAltTagToUploadModel < ActiveRecord::Migration
  def change
    add_column :media_uploads, :alt_tag, :string, index: true
  end
end
