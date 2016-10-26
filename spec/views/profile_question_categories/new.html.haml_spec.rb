require 'spec_helper'

describe "profile_question_categories/new" do
  before(:each) do
    assign(:profile_question_category, stub_model(ProfileQuestionCategory,
      :name => "MyString",
      :running_order => 1
    ).as_new_record)
  end

  xit "renders new profile_question_category form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", profile_question_categories_path, "post" do
      assert_select "input#profile_question_category_name[name=?]", "profile_question_category[name]"
      assert_select "input#profile_question_category_running_order[name=?]", "profile_question_category[running_order]"
    end
  end
end
