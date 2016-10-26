# == Schema Information
#
# Table name: profile_question_answers
#
#  id                  :integer          not null, primary key
#  the_response        :text
#  user_id             :integer
#  profile_question_id :integer
#  created_at          :datetime
#  updated_at          :datetime
#

# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :profile_question_answer do
    the_response "MyText"
    user_id 1
    profile_question_id 1
  end
end
