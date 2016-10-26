class CreateMediaUploads < ActiveRecord::Migration
  def change
    create_table :media_uploads do |t|
      t.integer :user_id
      t.string :description
      t.string :tag
      t.string :media_type

      t.timestamps
    end
    add_attachment :media_uploads, :upload
  end
end
