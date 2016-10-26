# == Schema Information
#
# Table name: user_content_links
#
#  id                         :integer          not null, primary key
#  user_id                    :integer
#  bourbon_article_id         :integer
#  profile_id                 :integer
#  profile_question_answer_id :integer
#  preference                 :string(255)
#  score                      :integer          default(0)
#  created_at                 :datetime
#  updated_at                 :datetime
#

require 'spec_helper'

describe UserContentLink do

  # attribute-accessible
  black_list = %w(id score created_at updated_at)
  UserContentLink.column_names.each do |column_name|
    if black_list.include?(column_name)
      it { should_not allow_mass_assignment_of(column_name.to_sym) }
    else
      it { should allow_mass_assignment_of(column_name.to_sym) }
    end
  end

  # Constants
  it { UserContentLink.const_defined?(:PREFERENCES) }
  it { UserContentLink.const_defined?(:PREFERENCE_IDS) }

  # relationships
  it { should belong_to(:user) }
  it { should belong_to(:bourbon_article) }
  it { should belong_to(:profile) }
  it { should belong_to(:profile_question_answer) }

  # validation
  it { should validate_presence_of(:user_id) }
  it { should validate_numericality_of(:user_id) }

  it { should_not validate_presence_of(:bourbon_article_id) }
  it { should validate_numericality_of(:bourbon_article_id) }

  it { should_not validate_presence_of(:profile_id) }
  it { should validate_numericality_of(:profile_id) }

  it { should_not validate_presence_of(:profile_question_answer_id) }
  it { should validate_numericality_of(:profile_question_answer_id) }

  it { should ensure_inclusion_of(:preference).in_array(UserContentLink::PREFERENCE_IDS) }

  it { should validate_presence_of(:score) }
  it { should validate_numericality_of(:score) }

  # callbacks
  it { should callback(:assign_score).before(:validation).on(:create) }
  it { should callback(:check_dependencies).before(:destroy) }

  # scopes
  it { UserContentLink.should respond_to(:all_in_order) }
  it { UserContentLink.should respond_to(:bookmark) }
  it { UserContentLink.should respond_to(:recommend) }
  it { UserContentLink.should respond_to(:have) }
  it { UserContentLink.should respond_to(:no_thanks) }
  it { UserContentLink.should respond_to(:want) }
  it { UserContentLink.should respond_to(:follow) }

  # class methods
  it { UserContentLink.should respond_to(:preference_named) }
  it { UserContentLink.should respond_to(:preference_id) }
  it { UserContentLink.should respond_to(:visible_preferences) }

  # instance methods
  it { should respond_to(:destroyable?) }

end
