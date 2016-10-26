class RemoveCollaboratorFromArticles < ActiveRecord::Migration
  def change
    rename_column :bourbon_articles, :collaborator, :user_id
  end
end
