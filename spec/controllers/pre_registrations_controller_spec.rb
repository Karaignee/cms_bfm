require 'spec_helper'
require 'authlogic/test_case' # Required for Authlogic
require 'support/users_and_groups_setup'

describe PreRegistrationsController do

  include_context 'users and groups setup'

  let!(:pre_registration)   { FactoryGirl.create(:pre_registration) }
  let!(:valid_params)       { { email: 'kermit@example.com', source: 'some-source' } }

  context 'Use case - not logged in' do

    render_views

    describe "GET 'index' while not logged in" do
      it 'returns http redirect' do
        get 'index'
        flash[:success].should be_nil
        flash[:error].should == 'You must be signed in to access that page - please sign in'
        response.status.should == 302
        response.should redirect_to(sign_in_url)
      end
    end

    describe "GET 'show' while not logged in" do
      it 'returns http redirect' do
        get 'show', id: 1
        flash[:success].should be_nil
        flash[:error].should == 'You must be signed in to access that page - please sign in'
        response.status.should == 302
        response.should redirect_to(sign_in_url)
      end
    end

    describe "GET 'new' while not logged in" do
      it 'returns http redirect' do
        get 'new'
        flash[:success].should be_nil
        flash[:error].should == 'You must be signed in to access that page - please sign in'
        response.status.should == 302
        response.should redirect_to(sign_in_url)
      end
    end

    describe "POST 'create' while not logged in" do
      it 'returns http redirect' do
        post 'create'
        flash[:success].should be_nil
        flash[:error].should == 'You must be signed in to access that page - please sign in'
        response.status.should == 302
        response.should redirect_to(sign_in_url)
      end
    end

    describe "GET 'edit' while not logged in" do
      it 'returns http redirect' do
        get 'edit', id: 1
        flash[:success].should be_nil
        flash[:error].should == 'You must be signed in to access that page - please sign in'
        response.status.should == 302
        response.should redirect_to(sign_in_url)
      end
    end

    describe "PUT 'update' while not logged in" do
      it 'returns http redirect' do
        put 'update', id: 1
        flash[:success].should be_nil
        flash[:error].should == 'You must be signed in to access that page - please sign in'
        response.status.should == 302
        response.should redirect_to(sign_in_url)
      end
    end

    describe "DELETE 'destroy' while not logged in" do
      it 'returns http redirect' do
        delete 'destroy', id: 1
        flash[:success].should be_nil
        flash[:error].should == 'You must be signed in to access that page - please sign in'
        response.status.should == 302
        response.should redirect_to(sign_in_url)
      end
    end

  end

  context 'Use case - logged in as a normal user' do

    render_views

    let(:log_them_in)      { UserSession.create(normal_user) }

    before(:each) do
      activate_authlogic # Required for Authlogic
      log_them_in
    end

    describe "GET 'index' while logged in as a normal user" do
      it 'returns http redirect' do
        get 'index'
        flash[:success].should be_nil
        flash[:error].should == 'You are not permitted to do that'
        response.status.should == 302
      end
    end

    describe "GET 'show' while logged in as a normal user" do
      it 'returns http redirect' do
        get 'show', id: 1
        flash[:success].should be_nil
        flash[:error].should == 'You are not permitted to do that'
        response.status.should == 302
      end
    end

    describe "GET 'new' while logged in as a normal user" do
      it 'returns http redirect' do
        get 'new'
        flash[:success].should be_nil
        flash[:error].should == 'You are not permitted to do that'
        response.status.should == 302
      end
    end

    describe "POST 'create' while logged in as a normal user" do
      it 'returns http redirect' do
        post 'create'
        flash[:success].should be_nil
        flash[:error].should == 'You are not permitted to do that'
        response.status.should == 302
      end
    end

    describe "GET 'edit' while logged in as a normal user" do
      it 'returns http redirect' do
        get 'edit', id: 1
        flash[:success].should be_nil
        flash[:error].should == 'You are not permitted to do that'
        response.status.should == 302
      end
    end

    describe "PUT 'update' while logged in as a normal user" do
      it 'returns http redirect' do
        put 'update', id: 1
        flash[:success].should be_nil
        flash[:error].should == 'You are not permitted to do that'
        response.status.should == 302
      end
    end

    describe "DELETE 'destroy' while logged in as a normal user" do
      it 'returns http redirect' do
        put 'destroy', id: 1
        flash[:success].should be_nil
        flash[:error].should == 'You are not permitted to do that'
        response.status.should == 302
      end
    end

  end

  context 'Use case - logged in as a contributor user' do

    render_views

    let(:log_them_in)      { UserSession.create(contributor_user) }

    before(:each) do
      activate_authlogic # Required for Authlogic
      log_them_in
    end

    describe "GET 'index' while logged in as a contributor user" do
      it 'returns http redirect' do
        get 'index'
        flash[:success].should be_nil
        flash[:error].should == 'You are not permitted to do that'
        response.status.should == 302
      end
    end

    describe "GET 'show' while logged in as a contributor user" do
      it 'returns http redirect' do
        get 'show', id: 1
        flash[:success].should be_nil
        flash[:error].should == 'You are not permitted to do that'
        response.status.should == 302
      end
    end

    describe "GET 'new' while logged in as a contributor user" do
      it 'returns http redirect' do
        get 'new'
        flash[:success].should be_nil
        flash[:error].should == 'You are not permitted to do that'
        response.status.should == 302
      end
    end

    describe "POST 'create' while logged in as a contributor user" do
      it 'returns http redirect' do
        post 'create'
        flash[:success].should be_nil
        flash[:error].should == 'You are not permitted to do that'
        response.status.should == 302
      end
    end

    describe "GET 'edit' while logged in as a contributor user" do
      it 'returns http redirect' do
        get 'edit', id: 1
        flash[:success].should be_nil
        flash[:error].should == 'You are not permitted to do that'
        response.status.should == 302
      end
    end

    describe "PUT 'update' while logged in as a contributor user" do
      it 'returns http redirect' do
        put 'update', id: 1
        flash[:success].should be_nil
        flash[:error].should == 'You are not permitted to do that'
        response.status.should == 302
      end
    end

    describe "DELETE 'destroy' while logged in as a contributor user" do
      it 'returns http redirect' do
        put 'destroy', id: 1
        flash[:success].should be_nil
        flash[:error].should == 'You are not permitted to do that'
        response.status.should == 302
      end
    end

  end

  context 'Use case - logged in as a curator user' do

    render_views

    let(:log_them_in)      { UserSession.create(curator_user) }

    before(:each) do
      activate_authlogic # Required for Authlogic
      log_them_in
    end

    describe "GET 'index' while logged in as a curator user" do
      it 'returns http redirect' do
        get 'index'
        flash[:success].should be_nil
        flash[:error].should == 'You are not permitted to do that'
        response.status.should == 302
      end
    end

    describe "GET 'show' while logged in as a curator user" do
      it 'returns http redirect' do
        get 'show', id: 1
        flash[:success].should be_nil
        flash[:error].should == 'You are not permitted to do that'
        response.status.should == 302
      end
    end

    describe "GET 'new' while logged in as a curator user" do
      it 'returns http redirect' do
        get 'new'
        flash[:success].should be_nil
        flash[:error].should == 'You are not permitted to do that'
        response.status.should == 302
      end
    end

    describe "POST 'create' while logged in as a curator user" do
      it 'returns http redirect' do
        post 'create'
        flash[:success].should be_nil
        flash[:error].should == 'You are not permitted to do that'
        response.status.should == 302
      end
    end

    describe "GET 'edit' while logged in as a curator user" do
      it 'returns http redirect' do
        get 'edit', id: 1
        flash[:success].should be_nil
        flash[:error].should == 'You are not permitted to do that'
        response.status.should == 302
      end
    end

    describe "PUT 'update' while logged in as a curator user" do
      it 'returns http redirect' do
        put 'update', id: 1
        flash[:success].should be_nil
        flash[:error].should == 'You are not permitted to do that'
        response.status.should == 302
      end
    end

    describe "DELETE 'destroy' while logged in as a curator user" do
      it 'returns http redirect' do
        put 'destroy', id: 1
        flash[:success].should be_nil
        flash[:error].should == 'You are not permitted to do that'
        response.status.should == 302
      end
    end

  end

  context 'Use case - logged in as an admin user' do

    render_views

    let(:log_them_in)      { UserSession.create(admin_user) }

    before(:each) do
      activate_authlogic # Required for Authlogic
      log_them_in
      request.env[:HTTP_USER_AGENT] = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1
FireFox out put is below'
    end

    describe "GET 'index' while logged in as an admin user" do
      it 'returns http ok' do
        get 'index'
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:pre_registrations).first.class.should == PreRegistration
        response.status.should == 200
        response.should render_template('index')
      end
    end

    describe "GET 'show' while logged in as an admin user" do
      it 'returns http ok' do
        get 'show', id: pre_registration.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:pre_registration).class.should == PreRegistration
        response.status.should == 200
        response.should render_template('show')
      end
    end

    describe "GET 'new' while logged in as an admin user" do
      it 'returns http ok' do
        get 'new', id: pre_registration.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:pre_registration).class.should == PreRegistration
        response.status.should == 200
        response.should render_template('new')
      end
    end

    describe "POST 'create' while logged in as an admin user" do
      it 'returns http ok' do
        post 'create', pre_registration: {email: nil}
        # invalid input
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:pre_registration).class.should == PreRegistration
        response.status.should == 200
        response.should render_template('new')
      end

      it 'returns http redirect' do
        post 'create', pre_registration: valid_params
        # valid input
        flash[:error].should be_nil
        flash[:success].should == 'PreRegistration was successfully created'
        assigns(:pre_registration).class.should == PreRegistration
        response.status.should == 302
      end
    end

    describe "GET 'edit' while logged in as an admin user" do
      it 'returns http redirect' do
        get 'edit', id: pre_registration.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        response.status.should == 200
        assigns(:pre_registration).class.should == PreRegistration
        response.should render_template('edit')
      end
    end

    describe "PUT 'update' while logged in as an admin user" do
      it 'returns http ok' do
        put 'update', id: pre_registration.id , pre_registration: {email: ''}
        # invalid input
        flash[:success].should be_nil
        flash[:error].should be_nil
        response.status.should == 200
        assigns(:pre_registration).class.should == PreRegistration
        response.should render_template('edit')
      end

      it 'returns http redirect' do
        put 'update', id: pre_registration.id,
            pre_registration: {email: 'abc@gmail.com'}
        # valid input
        flash[:success].should == 'PreRegistration was successfully updated'
        flash[:error].should be_nil
        assigns(:pre_registration).class.should == PreRegistration
        response.status.should == 302
      end
    end

    describe "DELETE 'update' while logged in as an admin user" do

      it 'returns http redirect' do
        delete 'destroy', id: pre_registration.id
        flash[:success].should_not be_nil
        flash[:error].should be_nil
        response.status.should == 302
      end

    end

  end

end
