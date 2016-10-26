class AddGearCategoryToGearPages < ActiveRecord::Migration
  def change
    add_reference :gear_pages, :gear_category, index: true
  end
end
