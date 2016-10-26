require 'spec_helper'

shared_context 'users and groups setup' do

  # user groups
  let!(:normal_user_group)      { FactoryGirl.create(:normal_user_group) }
  let!(:curator_user_group)     { FactoryGirl.create(:curator_user_group) }
  let!(:contributor_user_group) { FactoryGirl.create(:contributor_user_group) }
  let!(:admin_user_group)       { FactoryGirl.create(:admin_user_group) }

  # users
  let!(:normal_user)            { FactoryGirl.create(:normal_user,
                                                     user_group_id: normal_user_group.id) }
  let!(:contributor_user)       { FactoryGirl.create(:contributor_user,
                                                     user_group_id: contributor_user_group.id) }
  let!(:curator_user)           { FactoryGirl.create(:curator_user,
                                                     user_group_id: curator_user_group.id) }
  let!(:admin_user)             { FactoryGirl.create(:admin_user,
                                                     user_group_id: admin_user_group.id) }

  # countries
  let!(:country)                { FactoryGirl.create(:ireland) }
end
