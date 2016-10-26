class CreateProfileQuestionCategories < ActiveRecord::Migration
  def change
    create_table :profile_question_categories do |t|
      t.string :name
      t.integer :running_order, index: true

      t.timestamps
    end
  end
end
