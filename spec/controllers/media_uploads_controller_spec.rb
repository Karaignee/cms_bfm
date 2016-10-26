require 'spec_helper'
require 'authlogic/test_case' # Required for Authlogic
require 'support/users_and_groups_setup'

describe MediaUploadsController do

  include_context 'users and groups setup'

  let!(:media_upload)  { FactoryGirl.create(:media_upload, user_id: contributor_user.id) }
  let!(:valid_params)  { { user_id: contributor_user.id, description: 'Lorem ipsum',
                          tags: 'first, second, third', media_type: 'image',
                          publicly_available: true, make_text_bright: true,
                          alt_tag: 'some alt tag',
                          upload: fixture_file_upload('images/Rails-logo.png')
                       } }

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

    describe "GET 'index'" do
      it 'returns http ok' do
        get 'index'
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:media_uploads).first.class.should == MediaUpload
        response.status.should == 200
        response.should render_template('index')
      end
    end

    describe "GET 'show'" do
      it 'returns http ok' do
        get 'show', id: media_upload.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:media_upload).class.should == MediaUpload
        response.status.should == 200
        response.should render_template('show')
      end
    end

    describe "GET 'new'" do
      it 'returns http ok' do
        get 'new'
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:media_upload).class.should == MediaUpload
        response.status.should == 200
        response.should render_template('new')
      end
    end

    describe "POST 'create'" do
      it 'returns http ok' do
        post 'create', media_upload: {name: nil}
        # invalid input
        flash[:success].should be_nil
        flash[:error].should == 'Item was not uploaded'
        assigns(:media_upload).class.should == MediaUpload
        response.status.should == 200
        response.should render_template('new')
      end

      it 'returns http redirect' do
        post 'create', media_upload: valid_params
        # valid input
        flash[:error].should be_nil
        flash[:success].should == 'Item uploaded'
        assigns(:media_upload).class.should == MediaUpload
        response.status.should == 302
      end
    end

    describe "GET 'edit'" do
      it 'returns http redirect' do
        get 'edit', id: media_upload.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        response.status.should == 200
        assigns(:media_upload).class.should == MediaUpload
        response.should render_template('edit')
      end
    end

    describe "PUT 'update'" do
      it 'returns http ok' do
        put 'update', id: media_upload.id , media_upload: {description: ''}
        # invalid input
        flash[:success].should be_nil
        flash[:error].should == 'Item was not updated'
        response.status.should == 200
        assigns(:media_upload).class.should == MediaUpload
        response.should render_template('edit')
      end

      it 'returns http redirect' do
        put 'update', id: media_upload.id,
            media_upload: {description: 'Photo of a lovely horse'}
        # valid input
        flash[:success].should == 'Item updated'
        flash[:error].should be_nil
        assigns(:media_upload).class.should == MediaUpload
        response.status.should == 302
      end
    end

    describe "DELETE 'destroy'" do

      let!(:related_thing) { FactoryGirl.create(:bourbon_article,
                                                image_id: media_upload.id) }

      it 'returns http redirect' do
        delete 'destroy', id: media_upload.id
        flash[:success].should be_nil
        flash[:error].should == 'Your upload was NOT deleted.'
        response.status.should == 302
      end

      it 'returns http redirect' do
        media_upload.bourbon_article_header_images.delete_all
        delete 'destroy', id: media_upload.id
        flash[:success].should == 'Your upload has been deleted'
        flash[:error].should be_nil
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

    describe "GET 'index'" do
      it 'returns http ok' do
        get 'index'
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:media_uploads).first.class.should == MediaUpload
        response.status.should == 200
        response.should render_template('index')
      end
    end

    describe "GET 'show'" do
      it 'returns http ok' do
        get 'show', id: media_upload.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:media_upload).class.should == MediaUpload
        response.status.should == 200
        response.should render_template('show')
      end
    end

    describe "GET 'new'" do
      it 'returns http ok' do
        get 'new', id: media_upload.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:media_upload).class.should == MediaUpload
        response.status.should == 200
        response.should render_template('new')
      end
    end

    describe "POST 'create'" do
      it 'returns http ok' do
        post 'create', media_upload: {name: nil}
        # invalid input
        flash[:success].should be_nil
        flash[:error].should == 'Item was not uploaded'
        assigns(:media_upload).class.should == MediaUpload
        response.status.should == 200
        response.should render_template('new')
      end

      it 'returns http redirect' do
        post 'create', media_upload: valid_params
        # valid input
        flash[:error].should be_nil
        flash[:success].should == 'Item uploaded'
        assigns(:media_upload).class.should == MediaUpload
        response.status.should == 302
      end
    end

    describe "GET 'edit'" do
      it 'returns http redirect' do
        get 'edit', id: media_upload.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        response.status.should == 200
        assigns(:media_upload).class.should == MediaUpload
        response.should render_template('edit')
      end
    end

    describe "PUT 'update'" do
      it 'returns http ok' do
        put 'update', id: media_upload.id , media_upload: {description: ''}
        # invalid input
        flash[:success].should be_nil
        flash[:error].should == 'Item was not updated'
        response.status.should == 200
        assigns(:media_upload).class.should == MediaUpload
        response.should render_template('edit')
      end

      it 'returns http redirect' do
        put 'update', id: media_upload.id,
            media_upload: {description: 'United States Dollar'}
        # valid input
        flash[:success].should == 'Item updated'
        flash[:error].should be_nil
        assigns(:media_upload).class.should == MediaUpload
        response.status.should == 302
      end
    end

    describe "DELETE 'destroy'" do

      let!(:related_thing) { FactoryGirl.create(:bourbon_article,
                                                image_id: media_upload.id) }

      it 'returns http redirect' do
        delete 'destroy', id: media_upload.id
        flash[:success].should be_nil
        flash[:error].should == 'Your upload was NOT deleted.'
        response.status.should == 302
      end

      it 'returns http redirect' do
        media_upload.bourbon_article_header_images.delete_all
        delete 'destroy', id: media_upload.id
        flash[:success].should == 'Your upload has been deleted'
        flash[:error].should be_nil
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

    describe "GET 'index'" do
      it 'returns http ok' do
        get 'index'
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:media_uploads).first.class.should == MediaUpload
        response.status.should == 200
        response.should render_template('index')
      end
    end

    describe "GET 'show'" do
      it 'returns http ok' do
        get 'show', id: media_upload.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:media_upload).class.should == MediaUpload
        response.status.should == 200
        response.should render_template('show')
      end
    end

    describe "GET 'new'" do
      it 'returns http ok' do
        get 'new', id: media_upload.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:media_upload).class.should == MediaUpload
        response.status.should == 200
        response.should render_template('new')
      end
    end

    describe "POST 'create'" do
      it 'returns http ok' do
        post 'create', media_upload: {name: nil}
        # invalid input
        flash[:success].should be_nil
        flash[:error].should == 'Item was not uploaded'
        assigns(:media_upload).class.should == MediaUpload
        response.status.should == 200
        response.should render_template('new')
      end

      it 'returns http redirect' do
        post 'create', media_upload: valid_params
        # valid input
        flash[:error].should be_nil
        flash[:success].should == 'Item uploaded'
        assigns(:media_upload).class.should == MediaUpload
        response.status.should == 302
      end
    end

    describe "GET 'edit'" do
      it 'returns http redirect' do
        get 'edit', id: media_upload.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        response.status.should == 200
        assigns(:media_upload).class.should == MediaUpload
        response.should render_template('edit')
      end
    end

    describe "PUT 'update'" do
      it 'returns http ok' do
        put 'update', id: media_upload.id , media_upload: {description: ''}
        # invalid input
        flash[:success].should be_nil
        flash[:error].should == 'Item was not updated'
        response.status.should == 200
        assigns(:media_upload).class.should == MediaUpload
        response.should render_template('edit')
      end

      it 'returns http redirect' do
        put 'update', id: media_upload.id,
            media_upload: {description: 'United States Dollar'}
        # valid input
        flash[:success].should == 'Item updated'
        flash[:error].should be_nil
        assigns(:media_upload).class.should == MediaUpload
        response.status.should == 302
      end
    end

    describe "DELETE 'destroy'" do

      let!(:related_thing) { FactoryGirl.create(:bourbon_article,
                                                image_id: media_upload.id) }

      it 'returns http redirect' do
        delete 'destroy', id: media_upload.id
        flash[:success].should be_nil
        flash[:error].should == 'Your upload was NOT deleted.'
        response.status.should == 302
      end

      it 'returns http redirect' do
        media_upload.bourbon_article_header_images.delete_all
        delete 'destroy', id: media_upload.id
        flash[:success].should == 'Your upload has been deleted'
        flash[:error].should be_nil
        response.status.should == 302
      end
    end

  end

end
