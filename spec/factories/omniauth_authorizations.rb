# == Schema Information
#
# Table name: omniauth_authorizations
#
#  id                     :integer          not null, primary key
#  provider               :string(255)
#  uid                    :string(255)
#  name                   :string(255)
#  first_name             :string(255)
#  last_name              :string(255)
#  email                  :string(255)
#  oauth_token            :string(255)
#  oauth_token_expires_at :datetime
#  user_id                :integer
#  created_at             :datetime
#  updated_at             :datetime
#

# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :omniauth_authorization do
    provider "MyString"
    uid "MyString"
    name "MyString"
    first_name "MyString"
    last_name "MyString"
    email "MyString"
    oauth_token "MyString"
    oauth_token_expires_at "2014-07-18 10:51:55"
    user_id 1

    trait :facebook do
      provider "facebook"
      uid "facebook-uid"
    end

    trait :current do
      oauth_token_expires_at { 3.days.from_now }
    end
  end
end
