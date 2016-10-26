require 'spec_helper'
require 'authlogic/test_case'
require 'support/users_and_groups_setup'

describe UsersController do

  include_context 'users and groups setup'

  let!(:valid_params) { {first_name: 'Taz', last_name: 'Montagne', email: 'taz@hotmail.com',
                         password: '123123123', password_confirmation: '123123123',
                         country_id: 1, time_zone: 'Dublin' } }

  let!(:invalid_params) { {first_name: nil} }


  context 'Nobody logged in...' do
    describe "GET 'index'" do
      it 'should redirect to root' do
        get :index
        response.status.should == 302
        response.should redirect_to(sign_in_url)
      end
    end

    describe "GET 'show/1'" do
      it 'should redirect to root' do
        get :show, id: 1
        response.status.should == 302
        response.should redirect_to(sign_in_url)
      end
    end

    describe "GET 'new'" do
      it 'should return success' do
        get :new
        response.status.should == 200
        response.should render_template(:new)
      end
    end

    describe "GET 'edit/1'" do
      it 'should redirect to root' do
        get :edit, id: 1
        response.status.should == 302
        response.should redirect_to(sign_in_url)
      end
    end

    describe "POST 'create'" do
      it 'should redirect to root' do
        post :create, user: valid_params
        response.status.should == 302
        response.should redirect_to(root_url)
        flash[:success].should_not be_nil
      end
    end

    describe "PUT 'update/1'" do
      it 'should redirect to root' do
        put :update, id: 1, user_group: valid_params
        response.status.should == 302
        response.should redirect_to(sign_in_url)
      end
    end

    describe "DELETE 'destroy'" do
      it 'should redirect to root' do
        delete :destroy, id: 1
        response.status.should == 302
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
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'show/x'" do
      it 'should redirect to root' do
        get :show, id: normal_user.id
        response.status.should == 200
        response.should render_template(:show)
        assigns(:user).id.should == normal_user.id
        assigns(:user).class.should == User
      end
    end

    describe "GET 'new'" do
      it 'should redirect to root' do
        get :new
        response.status.should == 302
        response.should redirect_to(root_url)
        flash[:error].should_not be_nil
      end
    end

    describe "GET 'edit/1'" do
      it 'should redirect to root' do
        get :edit, id: normal_user.id
        response.status.should == 200
        response.should render_template(:edit)
        assigns(:user).id.should == normal_user.id
        assigns(:user).class.should == User
      end
    end

    describe "POST 'create'" do
      it 'should redirect to root' do
        post :create, user: valid_params
        response.status.should == 302
        response.should redirect_to(root_url)
        flash[:error].should_not be_nil
      end
    end

    describe "PUT 'update/x'" do
      it 'should redirect to root' do
        put :update, id: normal_user.id, user: {first_name: 'Diane', last_name: 'Mellencamp'}
        response.status.should == 302
        response.should redirect_to(user_url(normal_user.id))
        flash[:success].should_not be_nil
        User.find(normal_user.id).full_name.should == 'Diane Mellencamp'
      end
    end

    describe "DELETE 'destroy'" do
      it 'should redirect to root' do
        delete :destroy, id: normal_user.id
        response.status.should == 302
        response.should redirect_to(root_url)
        flash[:error].should_not be_nil
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
        assigns(:users).to_a.first.class.should == User
      end
    end

    describe "GET 'show/x'" do
      it 'should respond with success' do
        get :show, id: normal_user.id
        response.status.should == 200
        response.should render_template(:show)
        assigns(:user).class.should == User
      end
    end

    describe "GET 'new'" do
      # admins are allowed to create other users.
      it 'should respond with success' do
        get :new
        response.status.should == 200
        response.should render_template(:new)
      end
    end

    describe "GET 'edit/1'" do
      it 'should respond with success' do
        get :edit, id: normal_user.id
        response.status.should == 200
        response.should render_template(:edit)
        assigns(:user).class.should == User
        assigns(:user).id.should == normal_user.id
      end
    end

    describe "POST 'create'" do
      # admins are allowed to create other users.
      it 'should respond with success' do
        post :create, user: valid_params
        response.status.should == 302
        response.should redirect_to(root_url)
        User.all.count.should == 5
      end
    end

    describe "PUT 'update/x'" do
      it 'should respond with success' do
        put :update, id: normal_user.id, user: {first_name: 'Philip'}
        response.status.should == 302
        response.should redirect_to(user_url(normal_user.id))
        User.find(normal_user.id).first_name.should == 'Philip'
      end
    end

    describe "DELETE 'destroy'" do
      it 'should redirect to users_url' do
        delete :destroy, id: normal_user.id
        response.status.should == 302
        response.should redirect_to(users_url)
        flash[:error].should_not be_nil
      end
    end

  end

end
