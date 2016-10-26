# == Schema Information
#
# Table name: user_invites
#
#  id              :integer          not null, primary key
#  user_id         :integer
#  invited_at      :datetime
#  first_name      :string(255)
#  email           :string(255)
#  activation_code :string(255)
#  invitee_user_id :integer
#  emails_sent     :integer          default(0)
#  created_at      :datetime
#  updated_at      :datetime
#

# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user_invite do
    user_id         1
    invited_at      Time.parse('2014-07-26 16:29:11')
    first_name      'Frank'
    email           { |n| "invitee-#{n}@example.com"}
    invitee_user_id nil
    activation_code { ApplicationController.generate_random_code(20) }
    emails_sent     0
  end
end
