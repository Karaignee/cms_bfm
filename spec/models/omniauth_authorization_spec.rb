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

require 'spec_helper'

describe OmniauthAuthorization do

  # Constants
  #it { OmniauthAuthorization.const_defined?(:CONSTANT_NAME) }

  # relationships
  it { should belong_to(:user) }

  # validation
  it { should validate_presence_of(:provider) }

  it { should validate_presence_of(:uid) }

  it { should validate_presence_of(:name) }

  it { should validate_presence_of(:first_name) }

  it { should validate_presence_of(:last_name) }

  it { should_not validate_presence_of(:email) }

  it { should validate_presence_of(:oauth_token) }

  it { should validate_presence_of(:oauth_token_expires_at) }

  it { should_not validate_presence_of(:user_id) }
  it { should validate_numericality_of(:user_id) }

  # callbacks
  it { should callback(:find_or_create_user).before(:create) }
  it { should callback(:check_dependencies).before(:destroy) }

  # scopes
  it { OmniauthAuthorization.should respond_to(:all_in_order) }
  it { OmniauthAuthorization.should respond_to(:current) }

  # class methods
  it { OmniauthAuthorization.should respond_to(:get_or_make) }

  # instance methods
  it { should respond_to(:destroyable?) }
  it { should respond_to(:find_or_create_user) }

end
