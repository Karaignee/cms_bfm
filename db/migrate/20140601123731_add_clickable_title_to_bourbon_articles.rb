class AddClickableTitleToBourbonArticles < ActiveRecord::Migration
  def up
    add_column :bourbon_articles, :clickable_title, :string, index: true
    rename_column :bourbon_articles, :tag, :tags
    BourbonArticle.all.each do |ba|
      ba.save
    end
  end

  def down
    remove_column :bourbon_articles, :clickable_title
    rename_column :bourbon_articles, :tags, :tag
  end
end
