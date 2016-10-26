require 'spec_helper'

describe "profile_questions/edit" do
  before(:each) do
    @profile_question = assign(:profile_question, stub_model(ProfileQuestion,
      :the_question => "MyString",
      :profile_question_category_id => 1,
      :running_order => 1
    ))
  end

  xit "renders the edit profile_question form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", profile_question_path(@profile_question), "post" do
      assert_select "input#profile_question_the_question[name=?]", "profile_question[the_question]"
      assert_select "input#profile_question_profile_question_category_id[name=?]", "profile_question[profile_question_category_id]"
      assert_select "input#profile_question_running_order[name=?]", "profile_question[running_order]"
    end
  end
end
