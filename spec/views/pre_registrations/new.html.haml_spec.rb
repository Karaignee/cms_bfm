require 'spec_helper'

describe "pre_registrations/new" do
  before(:each) do
    assign(:pre_registration, stub_model(PreRegistration,
      :email => "MyString",
      :ip_address => "MyString",
      :source => "MyString"
    ).as_new_record)
  end

  xit "renders new pre_registration form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", pre_registrations_path, "post" do
      assert_select "input#pre_registration_email[name=?]", "pre_registration[email]"
      assert_select "input#pre_registration_ip_address[name=?]", "pre_registration[ip_address]"
      assert_select "input#pre_registration_source[name=?]", "pre_registration[source]"
    end
  end
end
