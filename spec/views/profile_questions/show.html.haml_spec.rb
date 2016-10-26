require 'spec_helper'

describe "profile_questions/show" do
  before(:each) do
    @profile_question = assign(:profile_question, stub_model(ProfileQuestion,
      :the_question => "The Question",
      :profile_question_category_id => 1,
      :running_order => 2
    ))
  end

  xit "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/The Question/)
    rendered.should match(/1/)
    rendered.should match(/2/)
  end
end
