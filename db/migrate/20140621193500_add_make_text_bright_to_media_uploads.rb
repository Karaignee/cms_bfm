class AddMakeTextBrightToMediaUploads < ActiveRecord::Migration
  def change
    add_column :media_uploads, :make_text_bright, :boolean, default: false
  end
end
