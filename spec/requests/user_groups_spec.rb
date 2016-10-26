require 'spec_helper'
require 'authlogic/test_case'
require 'support/users_and_groups_setup'

describe 'UserGroups' do

  include_context 'users and groups setup'

  context 'Nobody logged in' do
    describe 'GET /user_groups' do
      it 'redirects to sign-in page' do
        get user_groups_path
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end
  end

  context 'Normal user logged in...' do

    before(:each) do
      activate_authlogic # Required for Authlogic
      UserSession.create(normal_user)
    end

    describe 'GET /user_groups' do
      it 'should redirect to home page' do
        get user_groups_url
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end
  end

  context 'Admin user logged in...' do

    before(:each) do
      activate_authlogic # Required for Authlogic
      UserSession.create(admin_user)
      stub(:current_user) { admin_user }
    end

    describe 'GET /user_groups' do
      xit 'should redirect to home page' do
        get user_groups_url
        UserGroup.all.count.should == 5
        flash[:error].should be_nil
        response.status.should == 200
        response.should render_template(:index)
      end
    end
  end

end
