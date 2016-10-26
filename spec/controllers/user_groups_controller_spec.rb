require 'spec_helper'
require 'authlogic/test_case'
require 'support/users_and_groups_setup'

describe UserGroupsController do

  include_context 'users and groups setup'

  let!(:valid_params) { {name: 'Super new group',
                         description: "Lauren's lips, mmmm", is_admin: false,
                         is_anonymous: false } }

  let!(:invalid_params) { {name: nil} }

  context 'Nobody logged in...' do
    describe "GET 'index'" do
      it 'should redirect to root' do
        get :index
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'show/1'" do
      it 'should redirect to root' do
        get :show, id: 1
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'new'" do
      it 'should redirect to root' do
        get :new
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'edit/1'" do
      it 'should redirect to root' do
        get :edit, id: 1
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "POST 'create'" do
      it 'should redirect to root' do
        post :create, user_group: valid_params
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "PUT 'update/1'" do
      it 'should redirect to root' do
        put :update, id: 1, user_group: valid_params
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "DELETE 'destroy'" do
      it 'should redirect to root' do
        delete :destroy, id: 1
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

    render_views

    describe "GET 'index'" do
      it 'should redirect to root' do
        get :index
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'show/1'" do
      it 'should redirect to root' do
        get :show, id: 1
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'new'" do
      it 'should redirect to root' do
        get :new
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'edit/1'" do
      it 'should redirect to root' do
        get :edit, id: 1
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "POST 'create'" do
      it 'should redirect to root' do
        post :create, user_group: valid_params
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "PUT 'update/1'" do
      it 'should redirect to root' do
        put :update, id: 1, user_group: valid_params
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "DELETE 'destroy'" do
      it 'should redirect to root' do
        delete :destroy, id: 1
        response.status.should == 302
        response.should redirect_to(root_url)
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
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'show/1'" do
      it 'should redirect to root' do
        get :show, id: 1
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'new'" do
      it 'should redirect to root' do
        get :new
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'edit/1'" do
      it 'should redirect to root' do
        get :edit, id: 1
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "POST 'create'" do
      it 'should redirect to root' do
        post :create, user_group: valid_params
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "PUT 'update/1'" do
      it 'should redirect to root' do
        put :update, id: 1, user_group: valid_params
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "DELETE 'destroy'" do
      it 'should redirect to root' do
        delete :destroy, id: 1
        response.status.should == 302
        response.should redirect_to(root_url)
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
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'show/1'" do
      it 'should redirect to root' do
        get :show, id: 1
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'new'" do
      it 'should redirect to root' do
        get :new
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'edit/1'" do
      it 'should redirect to root' do
        get :edit, id: 1
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "POST 'create'" do
      it 'should redirect to root' do
        post :create, user_group: valid_params
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "PUT 'update/1'" do
      it 'should redirect to root' do
        put :update, id: 1, user_group: valid_params
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "DELETE 'destroy'" do
      it 'should redirect to root' do
        delete :destroy, id: 1
        response.status.should == 302
        response.should redirect_to(root_url)
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
      it 'should redirect to root' do
        get :index
        response.status.should == 200
        response.should render_template(:index)
        assigns(:user_groups).to_a.first.class.should == UserGroup
      end
    end

    describe "GET 'show/1'" do
      it 'should redirect to root' do
        get :show, id: UserGroup.first.id
        response.status.should == 200
        response.should render_template(:show)
        assigns(:user_group).class.should == UserGroup
      end
    end

    describe "GET 'new'" do
      it 'should redirect to root' do
        get :new
        response.status.should == 200
        response.should render_template(:new)
        assigns(:user_group).class.should == UserGroup
      end
    end

    describe "GET 'edit/1'" do
      it 'should redirect to root' do
        get :edit, id: UserGroup.first.id
        response.status.should == 200
        response.should render_template(:edit)
        assigns(:user_group).class.should == UserGroup
      end
    end

    describe "POST 'create'" do
      it 'should redirect to root' do
        post :create, user_group: valid_params
        response.status.should == 302
        response.should redirect_to(user_groups_url)
        UserGroup.all.count.should == 5
      end
    end

    describe "PUT 'update/1'" do
      it 'should redirect to root' do
        chosen_group = UserGroup.first
        put :update, id: chosen_group.id, user_group: valid_params
        response.status.should == 302
        response.should redirect_to(user_groups_url)
        UserGroup.first.name.should == valid_params[:name]
      end
    end

    describe "DELETE 'destroy'" do
      it 'should redirect to root' do
        delete :destroy, id: UserGroup.first.id
        response.status.should == 302
        response.should redirect_to(user_groups_url)
        flash[:error].should_not be_nil
      end
    end

  end

end
