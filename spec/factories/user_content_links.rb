# == Schema Information
#
# Table name: user_content_links
#
#  id                         :integer          not null, primary key
#  user_id                    :integer
#  bourbon_article_id         :integer
#  profile_id                 :integer
#  profile_question_answer_id :integer
#  preference                 :string(255)
#  score                      :integer          default(0)
#  created_at                 :datetime
#  updated_at                 :datetime
#

# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user_content_link do
    user_id                     { User.first.try(:id) || 1 }
    bourbon_article_id          nil
    profile_id                  1
    profile_question_answer_id  nil
    preference                  'recommend'
    score                       0
  end
end
