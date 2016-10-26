class CreateVideoUploads < ActiveRecord::Migration
  def change
    create_table :video_uploads do |t|

      t.integer :bourbon_article_id
      t.string :url
      t.string :title
      t.text :description

      t.timestamps
    end
  end
end
