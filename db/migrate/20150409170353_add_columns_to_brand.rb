class AddColumnsToBrand < ActiveRecord::Migration
  def change
    add_column :brands, :description, :text
    add_reference :brands, :gear, index: true
  end
end
