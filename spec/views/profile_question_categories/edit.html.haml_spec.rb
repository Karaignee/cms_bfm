require 'spec_helper'

describe "profile_question_categories/edit" do
  before(:each) do
    @profile_question_category = assign(:profile_question_category, stub_model(ProfileQuestionCategory,
      :name => "MyString",
      :running_order => 1
    ))
  end

  xit "renders the edit profile_question_category form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", profile_question_category_path(@profile_question_category), "post" do
      assert_select "input#profile_question_category_name[name=?]", "profile_question_category[name]"
      assert_select "input#profile_question_category_running_order[name=?]", "profile_question_category[running_order]"
    end
  end
end
