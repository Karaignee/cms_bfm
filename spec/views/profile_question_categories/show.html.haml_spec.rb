require 'spec_helper'

describe "profile_question_categories/show" do
  before(:each) do
    @profile_question_category = assign(:profile_question_category, stub_model(ProfileQuestionCategory,
      :name => "Name",
      :running_order => 1
    ))
  end

  xit "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Name/)
    rendered.should match(/1/)
  end
end
