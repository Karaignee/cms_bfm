class CreateBourbonArticleMediaUploads < ActiveRecord::Migration
  def change
    create_table :bourbon_article_media_uploads do |t|
      t.integer :bourbon_article_id, index: true
      t.integer :media_upload_id, index: true
      t.integer :user_id, index: true

      t.timestamps
    end
  end
end
