require 'spec_helper'
require 'authlogic/test_case' # Required for Authlogic
require 'support/users_and_groups_setup'

describe CountriesController do

  include_context 'users and groups setup'

  let!(:country)            { FactoryGirl.create(:country) }
  let!(:valid_params)       { { name: 'Vulgaria', in_the_eu: true,
                                iso_code: 'VLA', running_order: 4, country_tld: '.vul' } }

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
    end

    describe "GET 'index' while logged in as an admin user" do
      it 'returns http ok' do
        get 'index'
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:countries).first.class.should == Country
        response.status.should == 200
        response.should render_template('index')
      end
    end

    describe "GET 'show' while logged in as an admin user" do
      it 'returns http ok' do
        get 'show', id: country.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:country).class.should == Country
        response.status.should == 200
        response.should render_template('show')
      end
    end

    describe "GET 'new' while logged in as an admin user" do
      it 'returns http ok' do
        get 'new', id: country.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:country).class.should == Country
        response.status.should == 200
        response.should render_template('new')
      end
    end

    describe "POST 'create' while logged in as an admin user" do
      it 'returns http ok' do
        post 'create', country: {name: nil}
        # invalid input
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:country).class.should == Country
        response.status.should == 200
        response.should render_template('new')
      end

      it 'returns http redirect' do
        post 'create', country: valid_params
        # valid input
        flash[:success].should == 'Country was successfully created'
        flash[:error].should be_nil
        assigns(:country).class.should == Country
        response.status.should == 302
      end
    end

    describe "GET 'edit' while logged in as an admin user" do
      it 'returns http redirect' do
        get 'edit', id: country.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        response.status.should == 200
        assigns(:country).class.should == Country
        response.should render_template('edit')
      end
    end

    describe "PUT 'update' while logged in as an admin user" do
      it 'returns http ok' do
        put 'update', id: country.id , country: {name: ''}
        # invalid input
        flash[:success].should be_nil
        flash[:error].should be_nil
        response.status.should == 200
        assigns(:country).class.should == Country
        response.should render_template('edit')
      end

      it 'returns http redirect' do
        put 'update', id: country.id,
            country: {name: 'United States Dollar'}
        # valid input
        flash[:success].should == 'Country was successfully updated'
        flash[:error].should be_nil
        assigns(:country).class.should == Country
        response.status.should == 302
      end
    end

    describe "DELETE 'update' while logged in as an admin user" do

      # let!(:related_thing) { FactoryGirl.create(:related_thing) }

      it 'returns http redirect' do
        delete 'destroy', id: country.id
        flash[:success].should be_nil
        flash[:error].should == 'Country could not be deleted.'
        response.status.should == 302
      end

      it 'returns http redirect' do
        country.users.delete_all
        delete 'destroy', id: country.id
        flash[:success].should == 'Country has been deleted.'
        flash[:error].should be_nil
        response.status.should == 302
      end
    end

  end

end
