require 'spec_helper'

describe "countries/new" do
  before(:each) do
    assign(:country, stub_model(Country,
      :name => "MyString",
      :in_the_eu => false,
      :running_order => 1,
      :iso_code => "MyString",
      :country_tld => "MyString"
    ).as_new_record)
  end

  it "renders new country form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", countries_path, "post" do
      assert_select "input#country_name[name=?]", "country[name]"
      assert_select "input#country_in_the_eu[name=?]", "country[in_the_eu]"
      assert_select "input#country_running_order[name=?]", "country[running_order]"
      assert_select "input#country_iso_code[name=?]", "country[iso_code]"
      assert_select "input#country_country_tld[name=?]", "country[country_tld]"
    end
  end
end
