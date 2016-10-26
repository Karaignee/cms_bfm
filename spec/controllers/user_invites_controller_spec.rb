require 'spec_helper'
require 'authlogic/test_case'
require 'support/users_and_groups_setup'

describe UserInvitesController do

  include_context 'users and groups setup'

  let!(:valid_params)   { {first_name: 'Taz', email: 'taz@hotmail.com'} }
  let!(:invalid_params) { {first_name: nil} }
  let!(:user_invite)    { FactoryGirl.create(:user_invite, user_id: normal_user.id) }

  context 'Nobody logged in...' do

    render_views

    describe "GET 'index'" do
      it 'should redirect to root' do
        get :index
        response.status.should == 302
        flash[:error].should == 'You must be signed in to access that page - please sign in'
        response.should redirect_to(sign_in_url)
      end
    end

    describe "GET 'show/1'" do
      it 'should redirect to root' do
        get :show, id: 1
        response.status.should == 302
        flash[:error].should == 'You must be signed in to access that page - please sign in'
        response.should redirect_to(sign_in_url)
      end
    end

    describe "GET 'new'" do
      it 'should return success' do
        get :new
        response.status.should == 302
        flash[:error].should == 'You must be signed in to access that page - please sign in'
        response.should redirect_to(sign_in_url)
      end
    end

    describe "GET 'edit/1'" do
      it 'should redirect to root' do
        get :edit, id: 1
        response.status.should == 302
        flash[:error].should == 'You must be signed in to access that page - please sign in'
        response.should redirect_to(sign_in_url)
      end
    end

    describe "POST 'create'" do
      it 'should redirect to root' do
        post :create, user: valid_params
        response.status.should == 302
        response.should redirect_to(sign_in_url)
        flash[:error].should == 'You must be signed in to access that page - please sign in'
      end
    end

    describe "PUT 'update/1'" do
      it 'should redirect to root' do
        put :update, id: 1, user_invite: valid_params
        response.status.should == 302
        flash[:error].should == 'You must be signed in to access that page - please sign in'
        response.should redirect_to(sign_in_url)
      end
    end

    describe "DELETE 'destroy'" do
      it 'should redirect to root' do
        delete :destroy, id: 1
        response.status.should == 302
        flash[:error].should == 'You must be signed in to access that page - please sign in'
        response.should redirect_to(sign_in_url)
      end
    end

    describe "GET 'activate'" do
      it 'should render successfully' do
        get :activate, code: user_invite.activation_code
        response.status.should == 200
        flash[:error].should be_nil
        flash[:success].should be_nil
        assigns(:user_invite).class.should == UserInvite
        assigns(:user_invite).id.should == user_invite.id
        assigns(:user).class.should == User
        assigns(:user).id.should == nil
        response.should render_template(:activate)
      end
    end

    describe "GET 're_send'" do
      it 'should redirect to root' do
        delete :destroy, id: 1
        response.status.should == 302
        flash[:error].should == 'You must be signed in to access that page - please sign in'
        response.should redirect_to(sign_in_url)
      end
    end

  end

  context 'Normal user logged in...' do

    before(:each) do
      activate_authlogic # Required for Authlogic
      UserSession.create(normal_user)
    end

    render_views

    describe "GET 'index'" do
      it 'should redirect to root' do
        get :index
        response.status.should == 302
        flash[:error].should == 'You are not permitted to do that'
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'show/x'" do
      it 'should redirect to root' do
        get :show, id: normal_user.id
        response.status.should == 302
        flash[:error].should == 'You are not permitted to do that'
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'new'" do
      it 'should redirect to root' do
        get :new
        response.status.should == 302
        flash[:error].should == 'You are not permitted to do that'
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'edit/1'" do
      it 'should redirect to root' do
        get :edit, id: normal_user.id
        response.status.should == 302
        flash[:error].should == 'You are not permitted to do that'
        response.should redirect_to(root_url)
      end
    end

    describe "POST 'create'" do
      it 'should redirect to root' do
        post :create, user_invite: valid_params
        response.status.should == 302
        UserInvite.count.should == 2
        response.should redirect_to(user_url(normal_user.id))
        flash[:error].should be_nil
        flash[:success].should == 'Invite has been successfully sent'
      end
    end

    describe "PUT 'update/x'" do
      it 'should redirect to root' do
        put :update, id: 1, user_invite: valid_params
        response.status.should == 302
        flash[:error].should == 'You are not permitted to do that'
        response.should redirect_to(root_url)
      end
    end

    describe "DELETE 'destroy'" do
      it 'should redirect to root' do
        delete :destroy, id: 1
        response.status.should == 302
        response.should redirect_to(root_url)
        flash[:error].should_not be_nil
      end
    end

    describe "GET 'activate'" do
      it 'should redirect to root' do
        get :activate, code: 1
        response.status.should == 302
        flash[:error].should == 'You must be logged out to do that'
        response.should redirect_to(root_url)
      end
    end

    describe "GET 're-send'" do
      it 'should redirect successfully' do
        get :re_send, code: user_invite.activation_code
        UserInvite.first.emails_sent.should == 2
        response.status.should == 302
        flash[:error].should be_nil
        flash[:success].should == 'Your invite has been re-sent.'
        response.should redirect_to(user_url(normal_user.url_code))
      end
    end

  end

  context 'Contributor user logged in...' do

    before(:each) do
      activate_authlogic # Required for Authlogic
      UserSession.create(contributor_user)
    end

    render_views

    describe "GET 'index'" do
      it 'should redirect to root' do
        get :index
        response.status.should == 302
        flash[:error].should == 'You are not permitted to do that'
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'show/x'" do
      it 'should redirect to root' do
        get :show, id: 1
        response.status.should == 302
        flash[:error].should == 'You are not permitted to do that'
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'new'" do
      it 'should redirect to root' do
        get :new
        response.status.should == 302
        flash[:error].should == 'You are not permitted to do that'
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'edit/1'" do
      it 'should redirect to root' do
        get :edit, id: 1
        response.status.should == 302
        flash[:error].should == 'You are not permitted to do that'
        response.should redirect_to(root_url)
      end
    end

    describe "POST 'create'" do
      it 'should redirect to root' do
        post :create, user_invite: valid_params
        UserInvite.count.should == 2
        response.should redirect_to(user_url(contributor_user.id))
        flash[:error].should be_nil
        flash[:success].should == 'Invite has been successfully sent'
      end
    end

    describe "PUT 'update/x'" do
      it 'should redirect to root' do
        put :update, id: 1, user_invite: valid_params
        response.status.should == 302
        flash[:error].should == 'You are not permitted to do that'
        response.should redirect_to(root_url)
      end
    end

    describe "DELETE 'destroy'" do
      it 'should redirect to root' do
        delete :destroy, id: 1
        response.status.should == 302
        response.should redirect_to(root_url)
        flash[:error].should_not be_nil
      end
    end

    describe "GET 'activate'" do
      it 'should redirect to root' do
        get :activate, code: 1
        response.status.should == 302
        flash[:error].should == 'You must be logged out to do that'
        response.should redirect_to(root_url)
      end
    end

    describe "GET 're-send'" do
      it 'should redirect successfully' do
        get :re_send, code: user_invite.activation_code
        UserInvite.first.emails_sent.should == 1
        response.status.should == 302
        flash[:error].should == 'Your invite was not re-sent.'
        flash[:success].should be_nil
        response.should redirect_to(user_url(contributor_user.url_code))
      end
    end

  end

  context 'Curator user logged in...' do

    before(:each) do
      activate_authlogic # Required for Authlogic
      UserSession.create(curator_user)
    end

    render_views

    describe "GET 'index'" do
      it 'should redirect to root' do
        get :index
        response.status.should == 302
        flash[:error].should == 'You are not permitted to do that'
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'show/x'" do
      it 'should redirect to root' do
        get :show, id: 1
        response.status.should == 302
        flash[:error].should == 'You are not permitted to do that'
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'new'" do
      it 'should redirect to root' do
        get :new
        response.status.should == 302
        flash[:error].should == 'You are not permitted to do that'
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'edit/1'" do
      it 'should redirect to root' do
        get :edit, id: 1
        response.status.should == 302
        flash[:error].should == 'You are not permitted to do that'
        response.should redirect_to(root_url)
      end
    end

    describe "POST 'create'" do
      it 'should redirect to root' do
        post :create, user_invite: valid_params
        UserInvite.count.should == 2
        response.should redirect_to(user_url(curator_user.id))
        flash[:error].should be_nil
        flash[:success].should == 'Invite has been successfully sent'
      end
    end

    describe "PUT 'update/x'" do
      it 'should redirect to root' do
        put :update, id: 1, user_invite: valid_params
        response.status.should == 302
        flash[:error].should == 'You are not permitted to do that'
        response.should redirect_to(root_url)
      end
    end

    describe "DELETE 'destroy'" do
      it 'should redirect to root' do
        delete :destroy, id: 1
        response.status.should == 302
        response.should redirect_to(root_url)
        flash[:error].should_not be_nil
      end
    end

    describe "GET 'activate'" do
      it 'should redirect to root' do
        get :activate, code: 1
        response.status.should == 302
        flash[:error].should == 'You must be logged out to do that'
        response.should redirect_to(root_url)
      end
    end

    describe "GET 're-send'" do
      it 'should redirect successfully' do
        get :re_send, code: user_invite.activation_code
        UserInvite.first.emails_sent.should == 1
        response.status.should == 302
        flash[:error].should == 'Your invite was not re-sent.'
        flash[:success].should be_nil
        response.should redirect_to(user_url(curator_user.url_code))
      end
    end
  end

  context 'Admin user logged in...' do

    before(:each) do
      activate_authlogic # Required for Authlogic
      UserSession.create(admin_user)
    end

    render_views

    describe "GET 'index'" do
      it 'should respond with success' do
        get :index
        response.status.should == 200
        response.should render_template(:index)
        assigns(:user_invites).to_a.first.class.should == UserInvite
      end
    end

    describe "GET 'show/x'" do
      it 'should respond with success' do
        get :show, id: user_invite.id
        response.status.should == 200
        response.should render_template(:show)
        assigns(:user_invite).class.should == UserInvite
        assigns(:user_invite).id.should == user_invite.id
        flash[:error].should be_nil
        flash[:success].should be_nil
      end
    end

    describe "GET 'new'" do
      it 'should respond with success' do
        get :new
        response.status.should == 200
        response.should render_template(:new)
        assigns(:user_invite).class.should == UserInvite
        flash[:error].should be_nil
        flash[:success].should be_nil
      end
    end

    describe "GET 'edit/1'" do
      it 'should respond with success' do
        get :edit, id: user_invite.id
        response.status.should == 200
        response.should render_template(:edit)
        assigns(:user_invite).class.should == UserInvite
        assigns(:user_invite).id.should == user_invite.id
        flash[:error].should be_nil
        flash[:success].should be_nil
      end
    end

    describe "POST 'create'" do
      it 'should respond with success' do
        post :create, user_invite: valid_params
        response.status.should == 302
        UserInvite.count.should == 2
        response.should redirect_to(user_invites_url)
        flash[:error].should be_nil
        flash[:success].should == 'Invite has been successfully sent'
      end
    end

    describe "PUT 'update/x'" do
      it 'should respond with success' do
        put :update, id: user_invite.id, user_invite: {first_name: 'Philip'}
        response.status.should == 302
        response.should redirect_to(user_invites_url)
        UserInvite.find(user_invite.id).first_name.should == 'Philip'
        flash[:error].should be_nil
        flash[:success].should == 'UserInvite was successfully updated'
      end
    end

    describe "DELETE 'destroy'" do
      it 'should redirect to users_url' do
        delete :destroy, id: user_invite.id
        response.status.should == 302
        response.should redirect_to(user_invites_url)
        flash[:error].should == 'UserInvite could not be deleted.'
        flash[:success].should be_nil
      end
    end

    describe "GET 'activate'" do
      it 'should respond with success' do
        get :activate, code: user_invite.activation_code
        response.status.should == 302
        response.should redirect_to(root_url)
        flash[:error].should == 'You must be logged out to do that'
        flash[:success].should be_nil
      end
    end

    describe "Get 're_send'" do
      it 'should respond with success' do
        get :re_send, code: user_invite.activation_code
        response.status.should == 302
        response.should redirect_to(user_url(admin_user.url_code))
        UserInvite.find(user_invite.id).emails_sent.should == 2
        flash[:error].should be_nil
        flash[:success].should == 'Your invite has been re-sent.'
      end
    end


  end

end
