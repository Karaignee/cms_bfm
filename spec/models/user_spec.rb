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

require 'spec_helper'

describe User do

  # attribute-accessible
  black_list = %w(id created_at updated_at activation_code activation_at
               password_reset_token password_reset_token_requested_at password_reset_at
               crypted_password password_salt perishable_token persistence_token
               single_access_token login_count failed_login_count last_request_at
               current_login_at last_login_at current_login_ip last_login_ip url_code
               activated_at)
  User.column_names.each do |column_name|
    if black_list.include?(column_name)
      it { should_not allow_mass_assignment_of(column_name.to_sym) }
    else
      it { should allow_mass_assignment_of(column_name.to_sym) }
    end
  end

  # relationships
  it { should have_many(:bourbon_articles) }
  it { should have_many(:bourbon_articles_contributed) }
  it { should have_many(:bourbon_articles_curated) }
  it { should belong_to(:country) }
  it { should have_many(:incoming_content_links) }
  it { should have_many(:omniauth_authorizations) }
  it { should have_many(:profile_question_answers) }
  it { should have_many(:user_invites) }
  it { should have_many(:user_content_links) }
  it { should belong_to(:user_group) }

  # validation
  it { should validate_presence_of(:email) }
  it { should validate_uniqueness_of(:email) }
  it { should ensure_length_of(:email).is_at_least(7).is_at_most(40) }
  it { should_not allow_value('bad@email').for(:email) }
  it { should_not allow_value('bad@email.c').for(:email) }
  it { should allow_value('bad@email.com').for(:email) }

  it { should validate_presence_of(:first_name) }
  it { should ensure_length_of(:first_name).is_at_least(2).is_at_most(30) }

  it { should validate_presence_of(:last_name) }
  it { should ensure_length_of(:last_name).is_at_least(2).is_at_most(30) }

  it { should validate_presence_of(:password).on(:create) }
  it { should ensure_length_of(:password).is_at_least(6).on(:create) }

  it { should validate_confirmation_of(:password).with_message("doesn't match Password").on(:create) }

  it { should ensure_inclusion_of(:user_group_id).in_array(UserGroup.full_list_of_ids).with_message('is not valid') }

  it { should validate_presence_of(:country_id) }
  it { should validate_numericality_of(:country_id) }

  it { should validate_presence_of(:time_zone) }

  # callbacks
  it { should callback(:set_url_code).before(:create)}
  it { should callback(:grant_user_invites).before(:create) }
  it { should callback(:geocode).before(:create).if(:current_login_ip_changed?) }
  it { should callback(:check_dependencies).before(:destroy) }

  # scopes
  it { User.should respond_to(:all_in_order) }

  # instance methods
  it { should respond_to(:admin?) }
  it { should respond_to(:change_password) }
  it { should respond_to(:consume_one_invite_credit) }
  it { should respond_to(:contributor?) }
  it { should respond_to(:curator?) }
  it { should respond_to(:destroyable?) }
  it { should respond_to(:full_name) }

  # class methods
  it { User.should respond_to(:activate_with_code) }
  it { User.should respond_to(:contributors_or_curators) }
  it { User.should respond_to(:list_of_ids) }
  it { User.should respond_to(:search_request) }
  it { User.should respond_to(:with_url_code) }
  it { User.should respond_to(:tagged_with) }

  # password reset processing
  it { User.should respond_to(:send_password_reset) }
  it { User.should respond_to(:validate_password_reset_code) }
  it { should respond_to(:reset_password_with_code) }

end
