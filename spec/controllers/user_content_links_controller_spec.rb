require 'spec_helper'
require 'authlogic/test_case' # Required for Authlogic
require 'support/users_and_groups_setup'

describe UserContentLinksController do

  include_context 'users and groups setup'

  let!(:user_content_link) { FactoryGirl.create(:user_content_link, user_id: normal_user.id) }

  context 'Use case - not logged in' do

    render_views

    describe "POST 'create' while not logged in" do
      it 'returns http redirect' do
        post 'create'
        flash[:success].should be_nil
        flash[:error].should == 'You must be signed in to access that page - please sign in'
        response.status.should == 302
        response.should redirect_to(sign_in_url)
      end
    end

    describe "DELETE 'destroy' while not logged in" do
      it 'returns http redirect' do
        delete :destroy, id: 1
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

    describe "POST 'create' while normal_user logged in" do
      it 'returns http redirect' do
        post 'create', user_content_link: {profile_id: normal_user.id}, commit: 'recommend?'
        flash[:success].should be_nil
        flash[:error].should be_nil
        UserContentLink.all.size.should == 2
        response.status.should == 302
        response.should redirect_to(profile_url(normal_user.url_code))
      end
    end

    describe "DELETE 'destroy' while normal_user logged in" do
      it 'returns http redirect' do
        delete :destroy, id: user_content_link.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        UserContentLink.all.count.should == 0
        response.status.should == 302
        response.should redirect_to(profile_url(normal_user.url_code))
      end
    end

  end

  context 'Use case - contributor logged in' do

    render_views

    let(:log_them_in)      { UserSession.create(contributor_user) }

    before(:each) do
      activate_authlogic # Required for Authlogic
      log_them_in
    end

    describe "POST 'create' while contributor logged in" do
      it 'returns http redirect' do
        post 'create', user_content_link: {profile_id: contributor_user.id}, commit: 'recommend?'
        flash[:success].should be_nil
        flash[:error].should be_nil
        UserContentLink.all.size.should == 2
        response.status.should == 302
        response.should redirect_to(profile_url(contributor_user.url_code))
      end
    end

    describe "DELETE 'destroy' while contributor logged in" do
      it 'returns http redirect' do
        delete :destroy, id: user_content_link.id
        flash[:error].should == 'Could not be updated'
        flash[:success].should be_nil
        UserContentLink.all.count.should == 1
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end
  end

  context 'Use case - curator logged in' do

    render_views

    let(:log_them_in)      { UserSession.create(curator_user) }

    before(:each) do
      activate_authlogic # Required for Authlogic
      log_them_in
    end

    describe "POST 'create' while curator logged in" do
      it 'returns http redirect' do
        post 'create', user_content_link: {profile_id: contributor_user.id}, commit: 'recommend?'
        flash[:success].should be_nil
        flash[:error].should be_nil
        UserContentLink.all.size.should == 2
        response.status.should == 302
        response.should redirect_to(profile_url(contributor_user.url_code))
      end
    end

    describe "DELETE 'destroy' while curator logged in" do
      it 'returns http redirect' do
        delete :destroy, id: user_content_link.id
        flash[:error].should == 'Could not be updated'
        flash[:success].should be_nil
        UserContentLink.all.count.should == 1
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end
  end

  context 'Use case - admin logged in' do

    render_views

    let(:log_them_in)      { UserSession.create(admin_user) }

    before(:each) do
      activate_authlogic # Required for Authlogic
      log_them_in
    end

    describe "POST 'create' while admin logged in" do
      it 'returns http redirect' do
        post 'create', user_content_link: {profile_id: admin_user.id}, commit: 'recommend?'
        flash[:error].should be_nil
        flash[:success].should be_nil
        UserContentLink.all.size.should == 2
        response.status.should == 302
        response.should redirect_to(profile_url(admin_user.url_code))
      end
    end

    describe "DELETE 'destroy' while admin logged in" do
      it 'returns http redirect' do
        delete :destroy, id: user_content_link.id
        flash[:error].should == 'Could not be updated'
        flash[:success].should be_nil
        UserContentLink.all.count.should == 1
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end
  end

end
