class RenameArticleIdInUserContentLinks < ActiveRecord::Migration
  def change
    rename_column :user_content_links, :article_id, :bourbon_article_id
  end
end
