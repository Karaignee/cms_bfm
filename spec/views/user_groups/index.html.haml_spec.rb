require 'spec_helper'

describe 'user_groups/index' do
  before(:each) do
    assign(:user_groups, [
      stub_model(UserGroup,
        :name => 'Name',
        :description => 'MyText',
        :is_admin => false,
        :is_anonymous => false
      ),
      stub_model(UserGroup,
        :name => 'Name',
        :description => 'MyText',
        :is_admin => false,
        :is_anonymous => false
      )
    ])
  end

  xit 'renders a list of user_groups' do
    render
    assert_select 'tr>td', :text => 'Name'.to_s, :count => 2
    assert_select 'tr>td', :text => 'MyText'.to_s, :count => 2
    assert_select 'tr>td', :text => false.to_s, :count => 2
    assert_select 'tr>td', :text => false.to_s, :count => 2
  end
end
