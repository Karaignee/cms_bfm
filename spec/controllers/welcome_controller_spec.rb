require 'spec_helper'
require 'authlogic/test_case' # Required for Authlogic
require 'support/users_and_groups_setup'

describe WelcomeController do

  include_context 'users and groups setup'

  context 'When nobody is logged in...' do

    describe "GET 'landing'" do
      it 'returns http success' do
        get 'landing'
        response.status.should == 200
        response.should render_template(:landing)
      end
    end

    describe "GET 'normal_user'" do
      it 'returns http success' do
        get 'normal_user'
        response.status.should == 302
        response.should redirect_to(sign_in_url)
      end
    end

    describe "GET 'curator'" do
      it 'returns http success' do
        get 'curator'
        response.status.should == 302
        response.should redirect_to(sign_in_url)
      end
    end

    describe "GET 'contributor'" do
      it 'returns http success' do
        get 'contributor'
        response.status.should == 302
        response.should redirect_to(sign_in_url)
      end
    end

    describe "GET 'admin'" do
      it 'returns http redirection' do
        get 'admin'
        response.status.should == 302
        response.should redirect_to(sign_in_url)
      end
    end

    describe "GET 'people'" do
      it 'returns http redirection' do
        get 'people'
        response.status.should == 302
        response.should redirect_to(sign_in_url)
      end
    end

    describe "GET 'privacy'" do
      it 'returns http redirection' do
        get 'privacy'
        response.status.should == 200
        response.should render_template('privacy')
      end
    end

    describe "POST 'search'" do
      it 'returns http redirection' do
        post 'search'
        response.status.should == 302
        response.should redirect_to(sign_in_url)
      end
    end

    describe "GET 'tag_search'" do
      it 'returns http redirection' do
        get 'tag_search', search_for_tag: 'abc'
        response.status.should == 302
        response.should redirect_to(sign_in_url)
      end
    end

  end

  context 'When a normal_user is logged in...' do

    before(:each) do
      activate_authlogic # Required for Authlogic
      UserSession.create(normal_user)
    end

    render_views

    describe "GET 'landing'" do
      it 'returns http success' do
        get 'landing'
        response.status.should == 200
        response.should render_template(:landing)
      end
    end

    describe "GET 'normal_user'" do
      it 'returns http success' do
        get 'normal_user'
        response.status.should == 200
        response.should render_template(:normal_user)
      end
    end

    describe "GET 'curator'" do
      it 'returns http success' do
        get 'curator'
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'contributor'" do
      it 'returns http success' do
        get 'contributor'
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'admin'" do
      it 'returns http redirection' do
        get 'admin'
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'people'" do
      it 'returns http redirection' do
        get 'people'
        response.status.should == 200
        response.should render_template(:people)
      end
    end

    describe "GET 'privacy'" do
      it 'returns http redirection' do
        get 'privacy'
        response.status.should == 200
        response.should render_template('privacy')
      end
    end

    describe "POST 'search'" do
      it 'returns http redirection' do
        post 'search', search_for_this: 'something'
        response.status.should == 200
        response.should render_template(:search)
      end
    end

    describe "get 'tag_search'" do
      it 'returns http redirection' do
        get 'tag_search', search_for_tag: 'something'
        response.status.should == 200
        response.should render_template(:tag_search)
      end
    end

  end

  context 'When a contributor is logged in...' do

    before(:each) do
      activate_authlogic # Required for Authlogic
      UserSession.create(contributor_user)
    end

    render_views

    describe "GET 'landing'" do
      it 'returns http success' do
        get 'landing'
        response.status.should == 200
        response.should render_template(:landing)
      end
    end

    describe "GET 'normal_user'" do
      it 'returns http success' do
        get 'normal_user'
        response.status.should == 200
        response.should render_template(:normal_user)
      end
    end

    describe "GET 'curator'" do
      it 'returns http success' do
        get 'curator'
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'contributor'" do
      it 'returns http success' do
        get 'contributor'
        response.status.should == 200
        response.should render_template(:contributor)
      end
    end

    describe "GET 'admin'" do
      it 'returns http redirection' do
        get 'admin'
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'people'" do
      it 'returns http redirection' do
        get 'people'
        response.status.should == 200
        response.should render_template(:people)
      end
    end

    describe "GET 'privacy'" do
      it 'returns http redirection' do
        get 'privacy'
        response.status.should == 200
        response.should render_template('privacy')
      end
    end

    describe "POST 'search'" do
      it 'returns http redirection' do
        post 'search', search_for_this: 'something'
        response.status.should == 200
        response.should render_template(:search)
      end
    end

    describe "get 'tag_search'" do
      it 'returns http redirection' do
        get 'tag_search', search_for_tag: 'something'
        response.status.should == 200
        response.should render_template(:tag_search)
      end
    end

  end

  context 'When a curator is logged in...' do

    before(:each) do
      activate_authlogic # Required for Authlogic
      UserSession.create(curator_user)
    end

    render_views

    describe "GET 'landing'" do
      it 'returns http success' do
        get 'landing'
        response.status.should == 200
        response.should render_template(:landing)
      end
    end

    describe "GET 'normal_user'" do
      it 'returns http success' do
        get 'normal_user'
        response.status.should == 200
        response.should render_template(:normal_user)
      end
    end

    describe "GET 'curator'" do
      it 'returns http success' do
        get 'curator'
        response.status.should == 200
        response.should render_template(:curator)
      end
    end

    describe "GET 'contributor'" do
      it 'returns http success' do
        get 'contributor'
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'admin'" do
      it 'returns http redirection' do
        get 'admin'
        response.status.should == 302
        response.should redirect_to(root_url)
      end
    end

    describe "GET 'people'" do
      it 'returns http redirection' do
        get 'people'
        response.status.should == 200
        response.should render_template(:people)
      end
    end

    describe "GET 'privacy'" do
      it 'returns http redirection' do
        get 'privacy'
        response.status.should == 200
        response.should render_template('privacy')
      end
    end

    describe "POST 'search'" do
      it 'returns http redirection' do
        post 'search', search_for_this: 'something'
        response.status.should == 200
        response.should render_template(:search)
      end
    end

    describe "get 'tag_search'" do
      it 'returns http redirection' do
        get 'tag_search', search_for_tag: 'something'
        response.status.should == 200
        response.should render_template(:tag_search)
      end
    end

  end

  context 'When an admin is logged in...' do

    before(:each) do
      activate_authlogic # Required for Authlogic
      UserSession.create(admin_user)
    end

    render_views

    describe "GET 'landing'" do
      it 'returns http success' do
        get 'landing'
        response.status.should == 200
        response.should render_template(:landing)
      end
    end

    describe "GET 'normal_user'" do
      it 'returns http success' do
        get 'normal_user'
        response.status.should == 200
        response.should render_template(:normal_user)
      end
    end

    describe "GET 'curator'" do
      it 'returns http success' do
        get 'curator'
        response.status.should == 200
        response.should render_template(:curator)
      end
    end

    describe "GET 'contributor'" do
      it 'returns http success' do
        get 'contributor'
        response.status.should == 200
        response.should render_template(:contributor)
      end
    end

    describe "GET 'admin'" do
      it 'returns http redirection' do
        get 'admin'
        response.status.should == 200
        response.should render_template(:admin)
      end
    end

    describe "GET 'people'" do
      it 'returns http redirection' do
        get 'people'
        response.status.should == 200
        response.should render_template(:people)
      end
    end

    describe "GET 'privacy'" do
      it 'returns http redirection' do
        get 'privacy'
        response.status.should == 200
        response.should render_template('privacy')
      end
    end

    describe "POST 'search'" do
      it 'returns http redirection' do
        post 'search', search_for_this: 'something'
        response.status.should == 200
        response.should render_template(:search)
      end
    end

    describe "get 'tag_search'" do
      it 'returns http redirection' do
        get 'tag_search', search_for_tag: 'something'
        response.status.should == 200
        response.should render_template(:tag_search)
      end
    end

  end

end
