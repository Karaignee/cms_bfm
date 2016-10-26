class CreateProfileQuestions < ActiveRecord::Migration
  def change
    create_table :profile_questions do |t|
      t.string :the_question
      t.integer :profile_question_category_id, index: true
      t.integer :running_order, index: true

      t.timestamps
    end
  end
end
