require 'spec_helper'

describe "user_invites/index" do
  before(:each) do
    assign(:user_invites, [
      stub_model(UserInvite,
        :user_id => 1,
        :first_name => "First Name",
        :email => "Email",
        :invitee_user_id => 2,
        :emails_sent => 3
      ),
      stub_model(UserInvite,
        :user_id => 1,
        :first_name => "First Name",
        :email => "Email",
        :invitee_user_id => 2,
        :emails_sent => 3
      )
    ])
  end

  xit "renders a list of user_invites" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => "First Name".to_s, :count => 2
    assert_select "tr>td", :text => "Email".to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => 3.to_s, :count => 2
  end
end
