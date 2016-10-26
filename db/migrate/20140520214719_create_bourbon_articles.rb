class CreateBourbonArticles < ActiveRecord::Migration
  def change
    create_table :bourbon_articles do |t|
      t.string :article_title, index: true
      t.integer :contributor_id, index: true
      t.integer :curator_id, index: true
      t.integer :collaborator, index: true
      t.string :article_subtitle
      t.datetime :article_published_at, index: true
      t.integer :image_id
      t.text :article_body
      t.string :tag
      t.boolean :visible

      t.timestamps
    end
  end
end
