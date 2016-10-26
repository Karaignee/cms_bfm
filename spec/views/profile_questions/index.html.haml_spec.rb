require 'spec_helper'

describe "profile_questions/index" do
  before(:each) do
    assign(:profile_questions, [
      stub_model(ProfileQuestion,
        :the_question => "The Question",
        :profile_question_category_id => 1,
        :running_order => 2
      ),
      stub_model(ProfileQuestion,
        :the_question => "The Question",
        :profile_question_category_id => 1,
        :running_order => 2
      )
    ])
  end

  xit "renders a list of profile_questions" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "The Question".to_s, :count => 2
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
  end
end
