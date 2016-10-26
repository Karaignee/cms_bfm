# == Schema Information
#
# Table name: countries
#
#  id            :integer          not null, primary key
#  name          :string(255)
#  in_the_eu     :boolean
#  running_order :integer
#  iso_code      :string(255)
#  country_tld   :string(255)
#  created_at    :datetime
#  updated_at    :datetime
#

# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :country do
    sequence(:name)     { |n| "People's Republic No. #{n}" }
    in_the_eu           true
    sequence(:running_order) { |n| n * 100 }
    sequence(:iso_code) { |n| "ISO-#{n}"}
    sequence(:country_tld) { |n| "#{n}.com" }
  end

  factory :ireland, class: Country do
    name                'Ireland'
    in_the_eu           true
    running_order       100
    iso_code            'IE'
    country_tld         '.ie'
  end
end