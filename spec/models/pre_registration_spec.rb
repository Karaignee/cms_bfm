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

require 'spec_helper'

describe PreRegistration do

  # Constants
  #it { PreRegistration.const_defined?(:CONSTANT_NAME) }

  # relationships

  # validation
  it { should validate_presence_of(:email) }
  it { should validate_uniqueness_of(:email) }

  it { should validate_presence_of(:ip_address) }

  it { should validate_presence_of(:source) }

  it { should validate_presence_of(:user_agent) }

  # callbacks
  it { should callback(:check_dependencies).before(:destroy) }

  # scopes
  it { PreRegistration.should respond_to(:all_in_order) }

  # class methods
  
  # instance methods
  it { should respond_to(:destroyable?) }
  
end
