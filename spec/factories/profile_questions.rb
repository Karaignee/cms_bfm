# == Schema Information
#
# Table name: profile_questions
#
#  id                           :integer          not null, primary key
#  the_question                 :string(255)
#  profile_question_category_id :integer
#  running_order                :integer
#  created_at                   :datetime
#  updated_at                   :datetime
#

# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :profile_question do
    the_question                  'MyString'
    profile_question_category_id  { ProfileQuestionCategory.first.try(:id) || FactoryGirl.create(:profile_question_category).id }
    running_order                 100
  end
end
