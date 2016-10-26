require 'spec_helper'

describe 'users/index' do
  before(:each) do
    assign(:users, [
      stub_model(User,
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
        :active => false,
        :allow_email_alerts => false,
        :url_code => 'Url Code'
      ),
      stub_model(User,
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
      )
    ])
  end

  xit 'renders a list of users' do
    # render
    # # Run the generator again with the --webrat flag if you want to use webrat matchers
    # assert_select 'tr>td', :text => 'First Name'.to_s, :count => 2
    # assert_select 'tr>td', :text => 'Last Name'.to_s, :count => 2
    # assert_select 'tr>td', :text => 'Email'.to_s, :count => 2
    # assert_select 'tr>td', :text => 1.to_s, :count => 2
    # assert_select 'tr>td', :text => 2.to_s, :count => 2
    # assert_select 'tr>td', :text => false.to_s, :count => 2
    # assert_select 'tr>td', :text => false.to_s, :count => 2
    # assert_select 'tr>td', :text => 'Activation Code'.to_s, :count => 2
    # assert_select 'tr>td', :text => 3.to_s, :count => 2
    # assert_select 'tr>td', :text => 'Password Reset Token'.to_s, :count => 2
    # assert_select 'tr>td', :text => 'Crypted Password'.to_s, :count => 2
    # assert_select 'tr>td', :text => 'Password Salt'.to_s, :count => 2
    # assert_select 'tr>td', :text => 'Perishable Token'.to_s, :count => 2
    # assert_select 'tr>td', :text => 'Persistence Token'.to_s, :count => 2
    # assert_select 'tr>td', :text => 'Single Access Token'.to_s, :count => 2
    # assert_select 'tr>td', :text => 4.to_s, :count => 2
    # assert_select 'tr>td', :text => 5.to_s, :count => 2
    # assert_select 'tr>td', :text => 'Current Login Ip'.to_s, :count => 2
    # assert_select 'tr>td', :text => 'Last Login Ip'.to_s, :count => 2
    # assert_select 'tr>td', :text => false.to_s, :count => 2
    # assert_select 'tr>td', :text => false.to_s, :count => 2
    # assert_select 'tr>td', :text => 'Url Code'.to_s, :count => 2
  end
end
