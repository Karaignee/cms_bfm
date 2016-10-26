require 'spec_helper'

describe 'users/show' do
  before(:each) do
    @user = assign(:user, stub_model(User,
      :first_name => 'First Name',
      :last_name => 'Last Name',
      :email => 'Email',
      :country_id => 1,
      :user_group_id => 2,
      :active => false,
      :blocked => false,
      :activation_code => 'Activation Code',
      :blocked_by => 3,
      :password_reset_token => 'Password Reset Token',
      :crypted_password => 'Crypted Password',
      :password_salt => 'Password Salt',
      :perishable_token => 'Perishable Token',
      :persistence_token => 'Persistence Token',
      :single_access_token => 'Single Access Token',
      :login_count => 4,
      :failed_login_count => 5,
      :current_login_ip => 'Current Login Ip',
      :last_login_ip => 'Last Login Ip',
      :allow_email_alerts => false,
      :url_code => 'Url Code'
    ))
  end

  xit 'renders attributes in <p>' do
    render
    rendered.should match(/First Name/)
    rendered.should match(/Last Name/)
    rendered.should match(/Email/)
    rendered.should match(/1/)
    rendered.should match(/2/)
    rendered.should match(/false/)
    rendered.should match(/false/)
    rendered.should match(/Activation Code/)
    rendered.should match(/3/)
    rendered.should match(/Password Reset Token/)
    rendered.should match(/Crypted Password/)
    rendered.should match(/Password Salt/)
    rendered.should match(/Perishable Token/)
    rendered.should match(/Persistence Token/)
    rendered.should match(/Single Access Token/)
    rendered.should match(/4/)
    rendered.should match(/5/)
    rendered.should match(/Current Login Ip/)
    rendered.should match(/Last Login Ip/)
    rendered.should match(/false/)
    rendered.should match(/false/)
    rendered.should match(/Url Code/)
  end
end
