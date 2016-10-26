require 'spec_helper'

describe 'countries/show' do
  before(:each) do
    @country = assign(:country, stub_model(Country,
      :name => 'Name',
      :in_the_eu => false,
      :running_order => 1,
      :iso_code => 'Iso Code',
      :country_tld => 'Country Tld'
    ))
  end

  xit 'renders attributes in <p>' do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Name/)
    rendered.should match(/false/)
    rendered.should match(/1/)
    rendered.should match(/Iso Code/)
    rendered.should match(/Country Tld/)
  end
end
