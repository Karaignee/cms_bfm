class AddReadyForCurationToBourbonArticles < ActiveRecord::Migration
  def change
    add_column :bourbon_articles, :ready_for_curation, :boolean, :default => false, index: true
  end
end
