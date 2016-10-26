require 'spec_helper'

describe 'countries/index' do
  before(:each) do
    assign(:countries, [
      stub_model(Country,
        :name => 'Name',
        :in_the_eu => false,
        :running_order => 1,
        :iso_code => 'Iso Code',
        :country_tld => 'Country Tld'
      ),
      stub_model(Country,
        :name => 'Name',
        :in_the_eu => false,
        :running_order => 1,
        :iso_code => 'Iso Code',
        :country_tld => 'Country Tld'
      )
    ])
  end

  xit 'renders a list of countries' do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select 'tr>td', :text => 'Name'.to_s, :count => 2
    assert_select 'tr>td', :text => false.to_s, :count => 2
    assert_select 'tr>td', :text => 1.to_s, :count => 2
    assert_select 'tr>td', :text => 'Iso Code'.to_s, :count => 2
    assert_select 'tr>td', :text => 'Country Tld'.to_s, :count => 2
  end
end
