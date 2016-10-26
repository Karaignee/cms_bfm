require 'spec_helper'

describe "user_invites/new" do
  before(:each) do
    assign(:user_invite, stub_model(UserInvite,
      :user_id => 1,
      :first_name => "MyString",
      :email => "MyString",
      :invitee_user_id => 1,
      :emails_sent => 1
    ).as_new_record)
  end

  xit "renders new user_invite form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", user_invites_path, "post" do
      assert_select "input#user_invite_user_id[name=?]", "user_invite[user_id]"
      assert_select "input#user_invite_first_name[name=?]", "user_invite[first_name]"
      assert_select "input#user_invite_email[name=?]", "user_invite[email]"
      assert_select "input#user_invite_invitee_user_id[name=?]", "user_invite[invitee_user_id]"
      assert_select "input#user_invite_emails_sent[name=?]", "user_invite[emails_sent]"
    end
  end
end
