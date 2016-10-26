require 'spec_helper'

describe "user_invites/show" do
  before(:each) do
    @user_invite = assign(:user_invite, stub_model(UserInvite,
      :user_id => 1,
      :first_name => "First Name",
      :email => "Email",
      :invitee_user_id => 2,
      :emails_sent => 3
    ))
  end

  xit "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/1/)
    rendered.should match(/First Name/)
    rendered.should match(/Email/)
    rendered.should match(/2/)
    rendered.should match(/3/)
  end
end
