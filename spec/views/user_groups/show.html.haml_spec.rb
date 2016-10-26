require 'spec_helper'

describe 'user_groups/show' do
  before(:each) do
    @user_group = assign(:user_group, stub_model(UserGroup,
      :name => 'Name',
      :description => 'MyText',
      :is_admin => false,
      :is_anonymous => false
    ))
  end

  xit 'renders attributes in <p>' do
    render
    rendered.should match(/Name/)
    rendered.should match(/MyText/)
    rendered.should match(/false/)
    rendered.should match(/false/)
  end
end
