require 'spec_helper'

describe "pre_registrations/index" do
  before(:each) do
    assign(:pre_registrations, [
      stub_model(PreRegistration,
        :email => "Email",
        :ip_address => "Ip Address",
        :source => "Source"
      ),
      stub_model(PreRegistration,
        :email => "Email",
        :ip_address => "Ip Address",
        :source => "Source"
      )
    ])
  end

  xit "renders a list of pre_registrations" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Email".to_s, :count => 2
    assert_select "tr>td", :text => "Ip Address".to_s, :count => 2
    assert_select "tr>td", :text => "Source".to_s, :count => 2
  end
end
