# == Schema Information
#
# Table name: profile_questions
#
#  id                           :integer          not null, primary key
#  the_question                 :string(255)
#  profile_question_category_id :integer
#  running_order                :integer
#  created_at                   :datetime
#  updated_at                   :datetime
#

require 'spec_helper'

describe ProfileQuestion do

  # attribute-accessible
  black_list = %w(id created_at updated_at)
  ProfileQuestion.column_names.each do |column_name|
    if black_list.include?(column_name)
      it { should_not allow_mass_assignment_of(column_name.to_sym) }
    else
      it { should allow_mass_assignment_of(column_name.to_sym) }
    end
  end

  # relationships
  it { should belong_to(:profile_question_category) }
  it { should have_many(:profile_question_answers) }

  # validation
  it { should validate_presence_of(:the_question) }

  it { should validate_presence_of(:profile_question_category_id) }
  it { should validate_numericality_of(:profile_question_category_id) }

  it { should validate_presence_of(:running_order) }
  it { should validate_numericality_of(:running_order) }

  # callbacks
  it { should callback(:check_dependencies).before(:destroy) }

  # scopes
  it { ProfileQuestion.should respond_to(:all_in_order) }

  # class methods
  it { ProfileQuestion.should respond_to(:one_at_random_for_user_id) }
  
  # instance methods
  it { should respond_to(:destroyable?) }
  
end
