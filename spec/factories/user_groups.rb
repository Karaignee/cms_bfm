# == Schema Information
#
# Table name: user_groups
#
#  id                                :integer          not null, primary key
#  name                              :string(255)
#  description                       :text
#  is_admin                          :boolean
#  is_curator                        :boolean
#  is_contributor                    :boolean
#  created_at                        :datetime
#  updated_at                        :datetime
#  limit_user_invites_for_this_group :boolean          default(TRUE)
#  invites_limit_per_user            :integer          default(0)
#

# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user_group do
    sequence(:name)       {|n| "User Group #{n}"}
    description           'Lorem ipsum'
    is_admin              false
    is_contributor        false
    is_curator            false
    limit_user_invites_for_this_group true
    invites_limit_per_user 3
  end

  factory :normal_user_group, class: UserGroup do
    name                  'Normal users'
    description           'Lorem ipsum'
    is_admin              false
    is_contributor        false
    is_curator            false
    limit_user_invites_for_this_group true
    invites_limit_per_user 3
  end

  factory :admin_user_group, class: UserGroup do
    name                  'Admin users'
    description           'Lorem ipsum'
    is_admin              true
    is_contributor        true
    is_curator            true
  end

  factory :contributor_user_group, class: UserGroup do
    name                  'Contributor users'
    description           'Lorem ipsum'
    is_admin              false
    is_contributor        true
    is_curator            false
    limit_user_invites_for_this_group true
    invites_limit_per_user 3
  end

  factory :curator_user_group, class: UserGroup do
    name                  'Curator users'
    description           'Lorem ipsum'
    is_admin              false
    is_contributor        false
    is_curator            true
    limit_user_invites_for_this_group true
    invites_limit_per_user 3
  end

end
