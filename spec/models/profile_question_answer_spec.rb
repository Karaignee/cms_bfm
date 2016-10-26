# == Schema Information
#
# Table name: profile_question_answers
#
#  id                  :integer          not null, primary key
#  the_response        :text
#  user_id             :integer
#  profile_question_id :integer
#  created_at          :datetime
#  updated_at          :datetime
#

require 'spec_helper'

describe ProfileQuestionAnswer do

  # attribute-accessible
  black_list = %w(id created_at updated_at)
  ProfileQuestionAnswer.column_names.each do |column_name|
    if black_list.include?(column_name)
      it { should_not allow_mass_assignment_of(column_name.to_sym) }
    else
      it { should allow_mass_assignment_of(column_name.to_sym) }
    end
  end

  # relationships
  it { should belong_to(:user) }
  it { should belong_to(:profile_question) }
  it { should have_many(:user_content_links) }

  # validation
  it { should validate_presence_of(:the_response) }

  it { should validate_presence_of(:user_id) }
  it { should validate_numericality_of(:user_id) }

  it { should validate_presence_of(:profile_question_id) }
  it { should validate_numericality_of(:profile_question_id) }

  # callbacks
  it { should callback(:check_dependencies).before(:destroy) }

  # scopes
  it { ProfileQuestionAnswer.should respond_to(:all_in_order) }

  # class methods
  
  # instance methods
  it { should respond_to(:destroyable?) }
  
end
