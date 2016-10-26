require 'spec_helper'
require 'authlogic/test_case'
require 'support/users_and_groups_setup'

describe OauthSessionsController do

  let!(:sample_fb_hash) {
    {'provider' => 'facebook',
      'uid' => '10152191000416361',
      'info' => {
        'email' => 'karen_rooney@hotmail.com',
        'name' => 'Karen Rooney',
        'first_name' => 'Karen',
        'last_name' => 'Rooney',
        'image' => 'http://graph.facebook.com/10152191000416361/picture',
        'urls' => {
          'Facebook' => 'https://www.facebook.com/app_scoped_user_id/10152191000416361/'
        },
        'verified' => true
      },
      'credentials' => {
        'token' => 'CAAInU9JsEPwBACxmOOtLjEd0ZARD7G9dQcOUDoB8jdqeKZAdTGl3cEdbpnlkcZBvYCEdZCSkkjEH9LzANeNAF5DdV9PXlZAhxQfOXLGzvleN6mK8guXJIM4lrfqiHZB5uKkTLCsBvTDteu5VZBooa2uMpgokascOWXhkhIYCGTRxDDPo26kAe5bkduaIPhqZCl3GtzF544Bku7hAlnn2HWwm',
        'expires_at' => 1412019986,
        'expires' => true
      },
      'extra' => {
        'raw_info' => {
          'id' => '10152191000416361',
          'email' => 'karen_rooney@hotmail.com',
          'first_name' => 'Karen',
          'gender' => 'female',
          'last_name' => 'Rooney',
          'link' => 'https://www.facebook.com/app_scoped_user_id/10152191000416361/',
          'locale' => 'en_GB',
          'name' => 'Karen Rooney',
          'timezone' => 1,
          'updated_time' => '2014-07-28T16:41:11+0000',
          'verified' => true
        }
      }
    }
  }

  include_context 'users and groups setup'

  def stub_env_for_omniauth
    env = {'omniauth.auth' => sample_fb_hash}
    @controller.stub!(:env).and_return(env)
    env
    # http://stackoverflow.com/questions/12545288/how-can-i-write-an-omniauth-rspec-for-the-login
  end

  context 'Nobody logged in:' do

    render_views

    describe "GET 'create'" do
      it 'returns http success' do
        stub_env_for_omniauth
        get :create
        flash[:error].should be_nil
        flash[:success].should == 'Welcome back'
        response.status.should == 302
        response.should redirect_to(root_url)
        OmniauthAuthorization.all.count.should == 1
        # response.should have_selector("a:contains('Karen')")
        OmniauthAuthorization.first.user_id.should == User.where(email: 'karen_rooney@hotmail.com').first.id
      end
    end

    describe "GET 'omniauth_failure'" do
      it 'returns http redirection' do
        delete :omniauth_failure
        flash[:success].should be_nil
        flash[:error].should_not be_nil
        response.status.should == 302
        response.should redirect_to(sign_in_url)
      end
    end
  end

  context 'Logged in as a normal user:' do

    before(:each) do
      activate_authlogic # Required for Authlogic
      UserSession.create(normal_user)
    end

    render_views

    describe "GET 'create'" do
      it 'returns http redirect' do
        get :create
        flash[:success].should be_nil
        flash[:error].should == 'You must be logged out to do that'
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'omniauth_failure'" do
      it 'returns http redirection' do
        delete :omniauth_failure
        flash[:success].should be_nil
        flash[:error].should == 'You must be logged out to do that'
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

  end

end
