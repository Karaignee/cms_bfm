# == Schema Information
#
# Table name: profile_question_categories
#
#  id            :integer          not null, primary key
#  name          :string(255)
#  running_order :integer
#  created_at    :datetime
#  updated_at    :datetime
#

# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :profile_question_category do
    name          'MyString'
    running_order 100
  end
end
