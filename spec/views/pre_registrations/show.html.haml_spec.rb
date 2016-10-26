require 'spec_helper'

describe "pre_registrations/show" do
  before(:each) do
    @pre_registration = assign(:pre_registration, stub_model(PreRegistration,
      :email => "Email",
      :ip_address => "Ip Address",
      :source => "Source"
    ))
  end

  xit "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Email/)
    rendered.should match(/Ip Address/)
    rendered.should match(/Source/)
  end
end
