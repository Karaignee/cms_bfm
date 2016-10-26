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

require 'spec_helper'

describe UserInvite do

  # attr_accessible
  black_list = %w(id created_at updated_at)
  UserInvite.column_names.each do |column_name|
    if black_list.include?(column_name)
      it { should_not allow_mass_assignment_of(column_name.to_sym) }
    else
      it { should allow_mass_assignment_of(column_name.to_sym) }
    end
  end

  # Constants
  it { UserInvite.const_defined?(:STALE_LIMIT_DAYS) }

  # relationships
  it { should belong_to(:user) }
  it { should belong_to(:invitee_user) }

  # validation
  it { should validate_presence_of(:user_id) }
  it { should validate_numericality_of(:user_id) }

  xit { should validate_presence_of(:invited_at) }

  it { should validate_presence_of(:first_name) }

  it { should validate_presence_of(:email) }
  it { should validate_uniqueness_of(:email) }

  # This is set by the system, so it can't actually be tested without bypassing validation.
  xit { should validate_presence_of(:activation_code) }
  xit { should validate_uniqueness_of(:activation_code) }

  it { should_not validate_presence_of(:invitee_user_id) }
  it { should validate_numericality_of(:invitee_user_id) }

  it { should validate_presence_of(:emails_sent) }
  it { should validate_numericality_of(:emails_sent) }

  # callbacks
  it { should callback(:add_activation_code).before(:validation).on(:create) }
  it { should callback(:send_invite_email).after(:create) }
  it { should callback(:check_dependencies).before(:destroy) }

  # scopes
  it { UserInvite.should respond_to(:all_in_order) }

  # class methods
  it { UserInvite.should respond_to(:with_code) }
  
  # instance methods
  it { should respond_to(:closed?) }
  it { should respond_to(:destroyable?) }
  it { should respond_to(:send_invite_email) }
  it { should respond_to(:stale?) }
  it { should respond_to(:still_open?) }

end
