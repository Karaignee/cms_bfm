require 'spec_helper'

describe "profile_question_categories/index" do
  before(:each) do
    assign(:profile_question_categories, [
      stub_model(ProfileQuestionCategory,
        :name => "Name",
        :running_order => 1
      ),
      stub_model(ProfileQuestionCategory,
        :name => "Name",
        :running_order => 1
      )
    ])
  end

  xit "renders a list of profile_question_categories" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => 1.to_s, :count => 2
  end
end
