class AddFieldsToMediaUploads < ActiveRecord::Migration
  def change
    add_column :media_uploads, :publicly_available, :boolean, index: true
    add_column :media_uploads, :video_embed_code, :string, index: true
    rename_column :media_uploads, :tag, :tags
  end
end
