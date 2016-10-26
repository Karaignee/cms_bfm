require 'spec_helper'
require 'authlogic/test_case'
require 'support/users_and_groups_setup'

describe UserSessionsController do

  include_context 'users and groups setup'

  context 'while not logged in...' do
    describe "GET 'new'" do
      it 'returns http success' do
        get 'new'
        assigns(:user_session).class.should == UserSession
        response.status.should == 200
        response.should render_template(:new)
      end
    end

    describe "POST 'create'" do
      it 'returns https success' do
        post :create, user_session: {email: normal_user.email, password: '123123123'}
        assigns(:user_session).class.should == UserSession
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "DELETE 'destroy'" do
      it 'returns http redirect' do
        delete :destroy, id: 1
        flash[:error].should == 'You must be signed in to access that page - please sign in'
        response.status.should == 302
        response.should redirect_to(sign_in_url)
      end
    end

  end

  context 'while logged in as a normal user...' do

    before(:each) do
      activate_authlogic # Required for Authlogic
      UserSession.create(normal_user)
    end

    render_views

    describe "GET 'new'" do
      it 'returns http redirect' do
        get 'new'
        flash[:error].should == 'You must be logged out to do that'
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "POST 'create'" do
      it 'returns https redirect' do
        post :create, user_session: {email: normal_user.email, password: '123123123'}
        flash[:error].should == 'You must be logged out to do that'
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "DELETE 'destroy'" do
      it 'returns http success' do
        delete :destroy #, id: 1
        flash[:success].should == 'You are now logged out'
        flash[:error].should be_nil
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

  end

end
