# == Schema Information
#
# Table name: users
#
#  id                                :integer          not null, primary key
#  first_name                        :string(255)
#  last_name                         :string(255)
#  email                             :string(255)
#  country_id                        :integer
#  latitude                          :float
#  longitude                         :float
#  time_zone                         :string(255)
#  user_group_id                     :integer
#  active                            :boolean          default(FALSE), not null
#  blocked                           :boolean          default(FALSE), not null
#  activation_code                   :string(255)
#  activated_at                      :datetime
#  blocked_by                        :integer
#  password_reset_token              :string(255)
#  password_reset_token_requested_at :datetime
#  password_reset_at                 :datetime
#  crypted_password                  :string(255)      default(""), not null
#  password_salt                     :string(255)      default(""), not null
#  perishable_token                  :string(255)      default("")
#  persistence_token                 :string(255)
#  single_access_token               :string(255)
#  login_count                       :integer          default(0)
#  failed_login_count                :integer          default(0)
#  last_request_at                   :datetime
#  current_login_at                  :datetime
#  last_login_at                     :datetime
#  current_login_ip                  :string(255)
#  last_login_ip                     :string(255)
#  allow_email_alerts                :boolean          default(FALSE)
#  url_code                          :string(255)
#  created_at                        :datetime
#  updated_at                        :datetime
#  remaining_invites                 :integer          default(0)
#  tags                              :string(255)
#  location                          :string(255)
#

# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user do
    first_name              'James'
    last_name               'St.John-Smyth'
    password                '123123123'
    password_confirmation   '123123123'
    sequence(:email)        {|n| "jimmy.#{n}@example.com"}
    country_id              1
    user_group_id           1
    active                  true
    allow_email_alerts      true
    time_zone               'Dublin'
  end

  factory :normal_user, class: User do
    first_name              'John'
    last_name               'Doe'
    password                '123123123'
    password_confirmation   '123123123'
    sequence(:email)        {|n| "some.bloke.#{n}@example.com"}
    country_id              1
    user_group_id           1
    active                  true
    allow_email_alerts      true
    time_zone               'Dublin'
  end

  factory :contributor_user, class: User do
    first_name              'Taz'
    last_name               'Montagne'
    password                '123123123'
    password_confirmation   '123123123'
    sequence(:email)        {|n| "taz.#{n}@example.com"}
    country_id              1
    user_group_id           1
    active                  true
    allow_email_alerts      true
    time_zone               'Dublin'
  end

  factory :curator_user, class: User do
    first_name              'Eileen'
    last_name               'Frehily'
    password                '123123123'
    password_confirmation   '123123123'
    sequence(:email)        {|n| "eileen#{n}@example.com"}
    country_id              1
    user_group_id           1
    active                  true
    allow_email_alerts      true
    time_zone               'Dublin'
  end

  factory :admin_user, class: User do
    first_name              'Sheldon'
    last_name               'Cooper'
    password                '123123123'
    password_confirmation   '123123123'
    sequence(:email)        {|n| "sheldor#{n}@example.com"}
    country_id              1
    user_group_id           { UserGroup.admin_group.try(:id) || FactoryGirl.create(:admin_user_group) }
    active                  true
    allow_email_alerts      true
    time_zone               'Dublin'
  end

  factory :facebook_user, parent: :normal_user do
    user_group
    after(:create) do |user, evaluator|
      FactoryGirl.create(:omniauth_authorization, :facebook, :current, user: user, email: user.email)
    end
  end

end
