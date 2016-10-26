require 'spec_helper'
require 'authlogic/test_case' # Required for Authlogic
require 'support/users_and_groups_setup'

describe PasswordResetsController do

  include_context 'users and groups setup'

  let!(:test_user) { FactoryGirl.create(:normal_user, password_reset_token: 'abc123',
                                          active: false) }

  context 'Not logged in' do

    render_views

    describe "GET 'new'" do
      it 'returns http success' do
        get 'new'
        response.status.should == 200
        response.should render_template(:new)
      end
    end
  
    describe "POST 'create'" do
      it 'returns http success' do
        post 'create', email: test_user.email
        response.status.should == 200
        response.should render_template(:create)
      end
    end
  
    describe "GET 'edit'" do
      it 'returns http success' do
        get 'edit', id: test_user.password_reset_token
        response.status.should == 200
        response.should render_template(:edit)
      end
    end
  
    describe "PUT 'update'" do
      it 'returns http success' do
        put 'update', id: test_user.password_reset_token, password: '123123', password_confirmation: '123123'
        flash[:success].should == 'Your password has been reset, and you are re-activated.'
        flash[:error].should be_nil
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

  end
  
  context 'Logged in as a normal user' do

    let(:log_them_in)      { UserSession.create(normal_user) }

    before(:each) do
      activate_authlogic # Required for Authlogic
      log_them_in
    end

    describe "GET 'new'" do
      it 'should redirect' do
        get :new
        flash[:success].should be_nil
        flash[:error].should == 'You must be logged out to do that'
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "POST 'create'" do
      it 'should redirect' do
        post :create
        flash[:success].should be_nil
        flash[:error].should == 'You must be logged out to do that'
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'edit'" do
      it 'should redirect' do
        get :edit, id: 1
        flash[:success].should be_nil
        flash[:error].should == 'You must be logged out to do that'
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "PUT 'update'" do
      it 'should redirect' do
        put :update, id: 1
        flash[:success].should be_nil
        flash[:error].should == 'You must be logged out to do that'
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

  end
  
end
