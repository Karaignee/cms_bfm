# == Schema Information
#
# Table name: profile_question_categories
#
#  id            :integer          not null, primary key
#  name          :string(255)
#  running_order :integer
#  created_at    :datetime
#  updated_at    :datetime
#

require 'spec_helper'

describe ProfileQuestionCategory do

  # attribute-accessible
  black_list = %w(id created_at updated_at)
  ProfileQuestionCategory.column_names.each do |column_name|
    if black_list.include?(column_name)
      it { should_not allow_mass_assignment_of(column_name.to_sym) }
    else
      it { should allow_mass_assignment_of(column_name.to_sym) }
    end
  end

  # relationships
  it { should have_many(:profile_questions) }

  # validation
  it { should validate_presence_of(:name) }

  it { should validate_presence_of(:running_order) }

  # callbacks
  it { should callback(:check_dependencies).before(:destroy) }

  # scopes
  it { ProfileQuestionCategory.should respond_to(:all_in_order) }

  # class methods
  
  # instance methods
  it { should respond_to(:destroyable?) }
  
end
