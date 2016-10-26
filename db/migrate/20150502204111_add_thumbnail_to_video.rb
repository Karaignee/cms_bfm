class AddThumbnailToVideo < ActiveRecord::Migration
  def change
    add_column :video_uploads, :video_thumbnail, :string

  end
end
