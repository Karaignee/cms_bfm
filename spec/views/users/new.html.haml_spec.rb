require 'spec_helper'

describe 'users/new' do
  before(:each) do
    assign(:user, stub_model(User,
      :first_name => 'MyString',
      :last_name => 'MyString',
      :email => 'MyString',
      :country_id => 1,
      :user_group_id => 1,
      :active => false,
      :blocked => false,
      :activation_code => 'MyString',
      :blocked_by => 1,
      :password_reset_token => 'MyString',
      :crypted_password => 'MyString',
      :password_salt => 'MyString',
      :perishable_token => 'MyString',
      :persistence_token => 'MyString',
      :single_access_token => 'MyString',
      :login_count => 1,
      :failed_login_count => 1,
      :current_login_ip => 'MyString',
      :last_login_ip => 'MyString',
      :allow_email_alerts => false,
      :url_code => 'MyString'
    ).as_new_record)
  end

  xit 'renders new user form' do
    render

    assert_select 'form[action=?][method=?]', users_path, 'post' do
      assert_select 'input#user_first_name[name=?]', 'user[first_name]'
      assert_select 'input#user_last_name[name=?]', 'user[last_name]'
      assert_select 'input#user_email[name=?]', 'user[email]'
      assert_select 'input#user_country_id[name=?]', 'user[country_id]'
      assert_select 'input#user_user_group_id[name=?]', 'user[user_group_id]'
      assert_select 'input#user_active[name=?]', 'user[active]'
      assert_select 'input#user_blocked[name=?]', 'user[blocked]'
      assert_select 'input#user_activation_code[name=?]', 'user[activation_code]'
      assert_select 'input#user_blocked_by[name=?]', 'user[blocked_by]'
      assert_select 'input#user_password_reset_token[name=?]', 'user[password_reset_token]'
      assert_select 'input#user_crypted_password[name=?]', 'user[crypted_password]'
      assert_select 'input#user_password_salt[name=?]', 'user[password_salt]'
      assert_select 'input#user_perishable_token[name=?]', 'user[perishable_token]'
      assert_select 'input#user_persistence_token[name=?]', 'user[persistence_token]'
      assert_select 'input#user_single_access_token[name=?]', 'user[single_access_token]'
      assert_select 'input#user_login_count[name=?]', 'user[login_count]'
      assert_select 'input#user_failed_login_count[name=?]', 'user[failed_login_count]'
      assert_select 'input#user_current_login_ip[name=?]', 'user[current_login_ip]'
      assert_select 'input#user_last_login_ip[name=?]', 'user[last_login_ip]'
      assert_select 'input#user_active[name=?]', 'user[active]'
      assert_select 'input#user_allow_email_alerts[name=?]', 'user[allow_email_alerts]'
      assert_select 'input#user_url_code[name=?]', 'user[url_code]'
    end
  end
end
