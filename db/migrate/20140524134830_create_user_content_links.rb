class CreateUserContentLinks < ActiveRecord::Migration
  def change
    create_table :user_content_links do |t|
      t.integer :user_id, index: true
      t.integer :article_id, index: true
      t.integer :profile_id, index: true
      t.integer :profile_question_answer_id, index: true
      t.string  :preference, index: true
      t.integer :score, default: 0
      t.timestamps
    end
  end
end
