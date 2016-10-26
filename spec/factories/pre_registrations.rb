# == Schema Information
#
# Table name: pre_registrations
#
#  id         :integer          not null, primary key
#  email      :string(255)
#  ip_address :string(255)
#  source     :string(255)
#  created_at :datetime
#  updated_at :datetime
#  user_agent :string(255)
#

# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :pre_registration do
    sequence(:email) { |n| "user-#{n}@example.com" }
    ip_address       '192.168.1.123'
    source           'static-page'
    user_agent       'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/534.16 (KHTML, like Gecko) Chrome/10.0.648.205 Safari/534.16' # Chrome
  end
end
