require 'spec_helper'
require 'authlogic/test_case' # Required for Authlogic
require 'support/users_and_groups_setup'

describe BourbonArticlesController do

  include_context 'users and groups setup'

  let!(:published_article)          { FactoryGirl.create(:bourbon_article,
                                           article_title: 'Finished & visible',
                                           user_id: contributor_user.id,
                                           contributor_id: contributor_user.id,
                                           visible: true, ready_for_curation: true) }
  let!(:un_curated_article)        { FactoryGirl.create(:bourbon_article,
                                           article_title: 'Ready for curator review',
                                           user_id: contributor_user.id,
                                           contributor_id: contributor_user.id,
                                           curator_id: nil,
                                           visible: false, ready_for_curation: true) }
  let!(:un_finished_article)       { FactoryGirl.create(:bourbon_article,
                                           article_title: 'Still writing it',
                                           user_id: contributor_user.id,
                                           contributor_id: contributor_user.id,
                                           curator_id: nil,
                                           visible: false, ready_for_curation: false) }

  let!(:valid_params)               {{ article_title: 'How to make data',
                                       contributor_id: contributor_user.id,
                                       article_subtitle: 'Bla bla bla ',
                                       article_published_at: Time.now - 1.day,
                                       image_id: 1,
                                       article_body: 'Lorem ipsum',
                                       tags: 'Tech, stuff, data',
                                       visible: false,
                                       ready_for_curation: false,
                                       curator_id: nil }}
  
  context 'Use case - not logged in' do

    render_views

    describe "GET 'index'" do
      it 'returns success' do
        get 'index'
        flash[:success].should be_nil
        flash[:error].should be_nil
        response.status.should == 200
        response.should render_template(:index)
        assigns(:bourbon_articles).first.class.should == BourbonArticle
        assigns(:bourbon_articles).count.should == 1
      end
    end

    describe "GET 'show'" do
      it 'returns success for published_article' do
        get 'show', id: published_article.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template(:show)
      end
      it 'returns redirect for un_curated_article' do
        get 'show', id: un_curated_article.id
        flash[:success].should be_nil
        flash[:error].should_not be_nil
        response.status.should == 302
        response.should redirect_to(stories_url)
      end
      it 'returns redirect for un_finished_article' do
        get 'show', id: un_finished_article.id
        flash[:success].should be_nil
        flash[:error].should_not be_nil
        response.status.should == 302
        response.should redirect_to(stories_url)
      end
    end

    describe "GET 'new'" do
      it 'returns http redirect' do
        get 'new'
        flash[:success].should be_nil
        flash[:error].should == 'You must be signed in to access that page - please sign in'
        response.status.should == 302
        response.should redirect_to(sign_in_url)
      end
    end

    describe "POST 'create'" do
      it 'returns http redirect' do
        post 'create'
        flash[:success].should be_nil
        flash[:error].should == 'You must be signed in to access that page - please sign in'
        response.status.should == 302
        response.should redirect_to(sign_in_url)
      end
    end

    describe "GET 'edit'" do
      it 'returns http redirect' do
        get 'edit', id: 1
        flash[:success].should be_nil
        flash[:error].should == 'You must be signed in to access that page - please sign in'
        response.status.should == 302
        response.should redirect_to(sign_in_url)
      end
    end

    describe "PUT 'update'" do
      it 'returns http redirect' do
        put 'update', id: 1
        flash[:success].should be_nil
        flash[:error].should == 'You must be signed in to access that page - please sign in'
        response.status.should == 302
        response.should redirect_to(sign_in_url)
      end
    end

    describe "DELETE 'destroy'" do
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

    describe "GET 'index'" do
      it 'returns http redirect' do
        get 'index'
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_articles).first.class.should == BourbonArticle
        assigns(:bourbon_articles).count.should == 1
        response.status.should == 200
        response.should render_template(:index)
      end
    end

    describe "GET 'show'" do
      it 'returns success for published_article' do
        get 'show', id: published_article.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template(:show)
      end
      it 'returns redirect for un_published_article' do
        get 'show', id: un_curated_article.id
        flash[:success].should be_nil
        flash[:error].should_not be_nil
        response.status.should == 302
        response.should redirect_to(stories_url)
      end
      it 'returns redirect for un_finished_article' do
        get 'show', id: un_finished_article.id
        flash[:success].should be_nil
        flash[:error].should_not be_nil
        response.status.should == 302
        response.should redirect_to(stories_url)
      end
    end

    describe "GET 'new'" do
      it 'returns redirect' do
        get 'new'
        flash[:success].should be_nil
        flash[:error].should == 'You are not permitted to do that'
        response.status.should == 302
      end
    end

    describe "POST 'create'" do
      it 'returns redirect' do
        post 'create'
        flash[:success].should be_nil
        flash[:error].should == 'You are not permitted to do that'
        response.status.should == 302
      end
    end

    describe "GET 'edit'" do
      it 'returns redirect' do
        get 'edit', id: 1
        flash[:success].should be_nil
        flash[:error].should == 'You are not permitted to do that'
        response.status.should == 302
      end
    end

    describe "PUT 'update'" do
      it 'returns redirect' do
        put 'update', id: 1
        flash[:success].should be_nil
        flash[:error].should == 'You are not permitted to do that'
        response.status.should == 302
      end
    end

    describe "DELETE 'destroy'" do
      it 'returns redirect' do
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
      it 'returns success' do
        get 'index'
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_articles).first.class.should == BourbonArticle
        assigns(:bourbon_articles).count.should == 1
        response.status.should == 200
        response.should render_template('index')
      end
    end

    describe "GET 'show'" do
      it 'returns success for published_article' do
        get :show, id: published_article.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('show')
      end
      it 'returns success for un_curated_article' do
        get :show, id: un_curated_article.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('show')
      end
      it 'returns success for un_finished_article' do
        get :show, id: un_finished_article.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('show')
      end
    end

    describe "GET 'new'" do
      it 'returns http ok' do
        get :new
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('new')
      end
    end

    describe "POST 'create'" do
      it 'returns not-ok with bad params' do
        post 'create', bourbon_article: {name: nil} # invalid input
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).errors.full_messages.should_not == []
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('new')
      end

      it 'returns success with good params' do
        post 'create', bourbon_article: valid_params
        flash[:error].should be_nil
        flash[:success].should == 'Article was successfully created'
        assigns(:bourbon_article).errors.full_messages.should == []
        BourbonArticle.all.count.should == 4
        response.status.should == 302
        response.should redirect_to(welcome_contributor_url)
      end
    end

    describe "GET 'edit'" do
      it 'returns redirect for published_article' do
        get 'edit', id: published_article.id
        flash[:success].should be_nil
        flash[:error].should == 'Only a Curator or Admin can edit publicly-visible articles'
        response.status.should == 302
        response.should redirect_to(welcome_contributor_url)
      end
      it 'returns success for un_curated_article' do
        get 'edit', id: un_curated_article.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('edit')
      end
      it 'returns success for un_finished_article' do
        get 'edit', id: un_finished_article.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('edit')
      end
    end

    describe "PUT 'update'" do
      it 'returns redirect for published_article' do
        put 'update', id: published_article.id, bourbon_article: {article_body: ''}
        # invalid input
        flash[:success].should be_nil
        flash[:error].should_not be_nil
        response.status.should == 302
        response.should redirect_to(welcome_contributor_url)
      end
      it 'returns not-ok for un_curated_article with bad params' do
        put 'update', id: un_curated_article.id, bourbon_article: {article_body: ''}
        # invalid input
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('edit')
      end
      it 'returns success for un_curated_article with good params' do
        put 'update', id: un_curated_article.id,
            bourbon_article: {article_title: 'Some new title'}
        # valid input
        flash[:success].should == 'Article was successfully updated'
        flash[:error].should be_nil
        response.status.should == 302
        response.should redirect_to(story_path(un_curated_article.id))
      end
      it 'returns not-ok for un_curated_article with bad params' do
        put 'update', id: un_finished_article.id, bourbon_article: {article_body: ''},
            commit: 'Save and submit for Approval'
        # invalid input
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('edit')
      end
      it 'returns success for un_curated_article with good params' do
        put 'update', id: un_finished_article.id,
            bourbon_article: {article_title: 'Some new title'}
        # valid input
        flash[:success].should == 'Article was successfully updated'
        flash[:error].should be_nil
        response.status.should == 302
        response.should redirect_to(story_path(un_finished_article.id))
      end
    end

    describe "DELETE 'update' while logged in as a contributor user" do

      let!(:user_content_link_1) { FactoryGirl.create(:user_content_link,
                                            profile_id: nil,
                                            user_id: normal_user.id,
                                            bourbon_article_id: published_article.id) }
      let!(:user_content_link_2) { FactoryGirl.create(:user_content_link,
                                            profile_id: nil,
                                            user_id: normal_user.id,
                                            bourbon_article_id: un_curated_article.id) }
      let!(:user_content_link_3) { FactoryGirl.create(:user_content_link,
                                            profile_id: nil,
                                            user_id: normal_user.id,
                                            bourbon_article_id: un_finished_article.id) }

      it 'returns not-ok for published_article with dependencies' do
        delete 'destroy', id: published_article.id
        flash[:success].should be_nil
        flash[:error].should == 'Article could not be deleted.'
        response.status.should == 302
      end
      it 'returns success for published_article' do
        published_article.user_content_links.delete_all
        delete 'destroy', id: published_article.id
        flash[:success].should be_nil
        flash[:error].should == 'Article could not be deleted.'
        response.status.should == 302
      end

      it 'returns not-ok for un_curated_article with dependencies' do
        delete 'destroy', id: un_curated_article.id
        flash[:success].should be_nil
        flash[:error].should == 'Article could not be deleted.'
        response.status.should == 302
      end
      it 'returns success for un_curated_article' do
        un_curated_article.user_content_links.delete_all
        delete 'destroy', id: un_curated_article.id
        flash[:success].should_not be_nil
        flash[:error].should be_nil
        response.status.should == 302
      end

      it 'returns not-ok for un_finished_article with dependencies' do
        delete 'destroy', id: un_finished_article.id
        flash[:success].should be_nil
        flash[:error].should == 'Article could not be deleted.'
        response.status.should == 302
      end
      it 'returns success for un_finished_article' do
        un_finished_article.user_content_links.delete_all
        delete 'destroy', id: un_finished_article.id
        flash[:success].should_not be_nil
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
      it 'returns success' do
        get 'index'
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_articles).first.class.should == BourbonArticle
        assigns(:bourbon_articles).count.should == 1
        response.status.should == 200
        response.should render_template('index')
      end
    end

    describe "GET 'show'" do
      it 'returns success for published_article' do
        get 'show', id: published_article.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('show')
      end
      it 'returns success for un_curated_article' do
        get 'show', id: un_curated_article.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('show')
      end
      it 'returns success for un_finished_article' do
        get 'show', id: un_finished_article.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('show')
      end
    end

    describe "GET 'new'" do
      it 'returns success' do
        get 'new'
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('new')
      end
    end

    describe "POST 'create'" do
      it 'returns not OK for bad params' do
        post 'create', bourbon_article: {name: nil} # invalid input
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('new')
      end
      it 'returns success' do
        post 'create', bourbon_article: valid_params # valid input
        flash[:success].should == 'Article was successfully created'
        flash[:error].should be_nil
        BourbonArticle.all.count.should == 4
        response.status.should == 302
      end
    end

    describe "GET 'edit'" do
      it 'returns success for published_article' do
        get 'edit', id: published_article.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('edit')
      end
      it 'returns success for un_curated_article' do
        get 'edit', id: un_curated_article.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('edit')
      end
      it 'returns success for un_finished_article' do
        get 'edit', id: un_finished_article.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('edit')
      end
    end

    describe "PUT 'update'" do
      it 'returns not-ok for published_article and bad params' do
        put 'update', id: published_article.id ,
            bourbon_article: {article_title: ''} # invalid input
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('edit')
      end
      it 'returns success for published_article' do
        put 'update', id: published_article.id,
            bourbon_article: {article_title: 'A new title'}
        # valid input
        flash[:success].should == 'Article was successfully updated'
        flash[:error].should be_nil
        response.status.should == 302
      end
      it 'returns not-ok for un_curated_article and bad params' do
        put 'update', id: un_curated_article.id ,
            bourbon_article: {article_title: ''} # invalid input
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('edit')
      end
      it 'returns success for un_curated_article' do
        put 'update', id: un_curated_article.id,
            bourbon_article: {article_title: 'A new title'}
        # valid input
        flash[:success].should == 'Article was successfully updated'
        flash[:error].should be_nil
        response.status.should == 302
      end
      it 'returns not-ok for un_finished_article and bad params' do
        put 'update', id: un_finished_article.id ,
            bourbon_article: {article_title: ''},
            commit: 'Save and submit for Approval'
        # invalid input
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('edit')
      end
      it 'returns success for un_finished_article' do
        put 'update', id: un_finished_article.id,
            bourbon_article: {article_title: 'A new title'}
        # valid input
        flash[:success].should == 'Article was successfully updated'
        flash[:error].should be_nil
        response.status.should == 302
      end
    end

    describe "DELETE 'destroy'" do

      let!(:user_content_link_1) { FactoryGirl.create(:user_content_link,
                                      profile_id: nil,
                                      user_id: normal_user.id,
                                      bourbon_article_id: published_article.id) }
      let!(:user_content_link_2) { FactoryGirl.create(:user_content_link,
                                      profile_id: nil,
                                      user_id: normal_user.id,
                                      bourbon_article_id: un_curated_article.id) }
      let!(:user_content_link_3) { FactoryGirl.create(:user_content_link,
                                      profile_id: nil,
                                      user_id: normal_user.id,
                                      bourbon_article_id: un_finished_article.id) }

      it 'returns not-ok for published_article' do
        published_article.user_content_links.delete_all
        delete 'destroy', id: published_article.id
        flash[:success].should be_nil
        flash[:error].should == 'Article could not be deleted.'
        response.status.should == 302
      end
      it 'returns success for published_article' do
        published_article.user_content_links.delete_all
        delete 'destroy', id: published_article.id
        flash[:success].should be_nil
        flash[:error].should == 'Article could not be deleted.'
        response.status.should == 302
      end
      it 'returns not-ok for un_curated_article with dependencies' do
        delete 'destroy', id: un_curated_article.id
        flash[:success].should be_nil
        flash[:error].should == 'Article could not be deleted.'
        response.status.should == 302
      end
      it 'returns success for un_curated_article' do
        un_curated_article.user_content_links.delete_all
        delete 'destroy', id: un_curated_article.id
        flash[:success].should == 'Article has been deleted.'
        flash[:error].should be_nil
        response.status.should == 302
      end
      it 'returns not-ok for un_finished_article with dependencies' do
        delete 'destroy', id: un_finished_article.id
        flash[:success].should be_nil
        flash[:error].should == 'Article could not be deleted.'
        response.status.should == 302
      end
      it 'returns success for un_finished_article' do
        un_finished_article.user_content_links.delete_all
        delete 'destroy', id: un_finished_article.id
        flash[:success].should == 'Article has been deleted.'
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
      it 'returns success' do
        get 'index'
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_articles).first.class.should == BourbonArticle
        assigns(:bourbon_articles).count.should == 1
        response.status.should == 200
        response.should render_template('index')
      end
    end

    describe "GET 'show'" do
      it 'returns success for published_article' do
        get 'show', id: published_article.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('show')
      end
      it 'returns success for un_curated_article' do
        get 'show', id: un_curated_article.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('show')
      end
      it 'returns success for un_finished_article' do
        get 'show', id: un_finished_article.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('show')
      end
    end

    describe "GET 'new'" do
      it 'returns success' do
        get 'new'
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('new')
      end
    end

    describe "POST 'create'" do
      it 'returns not OK for bad params' do
        post 'create', bourbon_article: {name: nil} # invalid input
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('new')
      end
      it 'returns success' do
        post 'create', bourbon_article: valid_params # valid input
        flash[:success].should == 'Article was successfully created'
        flash[:error].should be_nil
        BourbonArticle.all.count.should == 4
        response.status.should == 302
      end
    end

    describe "GET 'edit'" do
      it 'returns success for published_article' do
        get 'edit', id: published_article.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('edit')
      end
      it 'returns success for un_curated_article' do
        get 'edit', id: un_curated_article.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('edit')
      end
      it 'returns success for un_finished_article' do
        get 'edit', id: un_finished_article.id
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('edit')
      end
    end

    describe "PUT 'update'" do
      it 'returns not-ok for published_article and bad params' do
        put 'update', id: published_article.id ,
            bourbon_article: {article_title: ''} # invalid input
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('edit')
      end
      it 'returns success for published_article' do
        put 'update', id: published_article.id,
            bourbon_article: {article_title: 'A new title'}
        # valid input
        flash[:success].should == 'Article was successfully updated'
        flash[:error].should be_nil
        response.status.should == 302
      end
      it 'returns not-ok for un_curated_article and bad params' do
        put 'update', id: un_curated_article.id ,
            bourbon_article: {article_title: ''} # invalid input
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('edit')
      end
      it 'returns success for un_curated_article' do
        put 'update', id: un_curated_article.id,
            bourbon_article: {article_title: 'A new title'}
        # valid input
        flash[:success].should == 'Article was successfully updated'
        flash[:error].should be_nil
        response.status.should == 302
      end
      it 'returns not-ok for un_finished_article and bad params' do
        put 'update', id: un_finished_article.id ,
            bourbon_article: {article_title: ''},
            commit: 'Save and submit for Approval'
        # invalid input
        flash[:success].should be_nil
        flash[:error].should be_nil
        assigns(:bourbon_article).class.should == BourbonArticle
        response.status.should == 200
        response.should render_template('edit')
      end
      it 'returns success for un_finished_article' do
        put 'update', id: un_finished_article.id,
            bourbon_article: {article_title: 'A new title'}
        # valid input
        flash[:success].should == 'Article was successfully updated'
        flash[:error].should be_nil
        response.status.should == 302
      end
    end

    describe "DELETE 'destroy'" do

      let!(:user_content_link_1) { FactoryGirl.create(:user_content_link,
                                                      profile_id: nil,
                                                      user_id: normal_user.id,
                                                      bourbon_article_id: published_article.id) }
      let!(:user_content_link_2) { FactoryGirl.create(:user_content_link,
                                                      profile_id: nil,
                                                      user_id: normal_user.id,
                                                      bourbon_article_id: un_curated_article.id) }
      let!(:user_content_link_3) { FactoryGirl.create(:user_content_link,
                                                      profile_id: nil,
                                                      user_id: normal_user.id,
                                                      bourbon_article_id: un_finished_article.id) }

      it 'returns not-ok for published_article' do
        published_article.user_content_links.delete_all
        delete 'destroy', id: published_article.id
        flash[:success].should be_nil
        flash[:error].should == 'Article could not be deleted.'
        response.status.should == 302
      end
      it 'returns success for published_article' do
        published_article.user_content_links.delete_all
        delete 'destroy', id: published_article.id
        flash[:success].should be_nil
        flash[:error].should == 'Article could not be deleted.'
        response.status.should == 302
      end
      it 'returns not-ok for un_curated_article with dependencies' do
        delete 'destroy', id: un_curated_article.id
        flash[:success].should be_nil
        flash[:error].should == 'Article could not be deleted.'
        response.status.should == 302
      end
      it 'returns success for un_curated_article' do
        un_curated_article.user_content_links.delete_all
        delete 'destroy', id: un_curated_article.id
        flash[:success].should == 'Article has been deleted.'
        flash[:error].should be_nil
        response.status.should == 302
      end
      it 'returns not-ok for un_finished_article with dependencies' do
        delete 'destroy', id: un_finished_article.id
        flash[:success].should be_nil
        flash[:error].should == 'Article could not be deleted.'
        response.status.should == 302
      end
      it 'returns success for un_finished_article' do
        un_finished_article.user_content_links.delete_all
        delete 'destroy', id: un_finished_article.id
        flash[:success].should == 'Article has been deleted.'
        flash[:error].should be_nil
        response.status.should == 302
      end
    end

  end

end
