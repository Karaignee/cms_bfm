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

require 'spec_helper'

describe UserGroup do

  # attr_accessible
  black_list = %w(id created_at updated_at)
  UserGroup.column_names.each do |column_name|
    if black_list.include?(column_name)
      it { should_not allow_mass_assignment_of(column_name.to_sym) }
    else
      it { should allow_mass_assignment_of(column_name.to_sym) }
    end
  end

  # relationships
  it { should have_many(:users) }

  # validation
  it { should validate_presence_of(:name) }
  it { should validate_uniqueness_of(:name) }

  it { should validate_presence_of(:description) }

  # callbacks
  it { should callback(:check_dependencies).before(:destroy) }

  # scopes
  it { UserGroup.should respond_to(:contributor_groups) }
  it { UserGroup.should respond_to(:curator_groups) }
  it { UserGroup.should respond_to(:all_in_order) }

  # class methods
  it { UserGroup.should respond_to(:admin_group) }
  it { UserGroup.should respond_to(:default_group) }
  it { UserGroup.should respond_to(:full_list_of_ids) }

  # instance methods
  it { should respond_to(:destroyable?) }

end
