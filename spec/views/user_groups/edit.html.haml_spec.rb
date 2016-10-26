require 'spec_helper'

describe 'user_groups/edit' do
  before(:each) do
    @user_group = assign(:user_group, stub_model(UserGroup,
      :name => 'MyString',
      :description => 'MyText',
      :is_admin => false,
      :is_anonymous => false
    ))
  end

  xit 'renders the edit user_group form' do
    render

    assert_select 'form[action=?][method=?]', user_group_path(@user_group), 'post' do
      assert_select 'input#user_group_name[name=?]', 'user_group[name]'
      assert_select 'textarea#user_group_description[name=?]', 'user_group[description]'
      assert_select 'input#user_group_is_admin[name=?]', 'user_group[is_admin]'
      assert_select 'input#user_group_is_anonymous[name=?]', 'user_group[is_anonymous]'
    end
  end
end
