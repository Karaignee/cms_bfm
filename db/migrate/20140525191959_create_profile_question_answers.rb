class CreateProfileQuestionAnswers < ActiveRecord::Migration
  def change
    create_table :profile_question_answers do |t|
      t.text :the_response
      t.integer :user_id, index: true
      t.integer :profile_question_id, index: true

      t.timestamps
    end
  end
end
