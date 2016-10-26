require 'spec_helper'

describe "countries/edit" do
  before(:each) do
    @country = assign(:country, stub_model(Country,
      :name => "MyString",
      :in_the_eu => false,
      :running_order => 1,
      :iso_code => "MyString",
      :country_tld => "MyString"
    ))
  end

  it "renders the edit country form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", country_path(@country), "post" do
      assert_select "input#country_name[name=?]", "country[name]"
      assert_select "input#country_in_the_eu[name=?]", "country[in_the_eu]"
      assert_select "input#country_running_order[name=?]", "country[running_order]"
      assert_select "input#country_iso_code[name=?]", "country[iso_code]"
      assert_select "input#country_country_tld[name=?]", "country[country_tld]"
    end
  end
end
