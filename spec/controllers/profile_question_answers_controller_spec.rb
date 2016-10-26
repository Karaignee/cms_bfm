require 'spec_helper'
require 'authlogic/test_case' # Required for Authlogic
require 'support/users_and_groups_setup'

describe ProfileQuestionAnswersController do

  include_context 'users and groups setup'

  let!(:profile_question)            { FactoryGirl.create(:profile_question) }
  let!(:profile_question_answer)     { FactoryGirl.create(:profile_question_answer) }
  let!(:valid_params)                { { the_response: 'Abcdefg',
                                         profile_question_id: profile_question.id,
                                         running_order: 5 } }

  context 'Use case - not logged in' do

    render_views

    describe "POST 'create' while not logged in" do
      it 'returns http redirect' do
        post 'create'
        flash[:success].should be_nil
        flash[:error].should == 'You must be signed in to access that page - please sign in'
        response.status.should == 302
        # response.should redirect_to(:back)
      end
    end

    describe "PUT 'update' while not logged in" do
      it 'returns http redirect' do
        put 'update', id: 1
        flash[:success].should be_nil
        flash[:error].should == 'You must be signed in to access that page - please sign in'
        response.status.should == 302
        # response.should redirect_to(:back)
      end
    end

    describe "DELETE 'destroy' while not logged in" do
      it 'returns http redirect' do
        delete 'destroy', id: 1
        flash[:success].should be_nil
        flash[:error].should == 'You must be signed in to access that page - please sign in'
        response.status.should == 302
        # response.should redirect_to(:back)
      end
    end

  end

  context 'Use case - logged in as a normal user' do

    render_views

    let(:log_them_in)      { UserSession.create(normal_user) }

    before(:each) do
      activate_authlogic # Required for Authlogic
      log_them_in
      request.env['HTTP_REFERER'] = stories_url
    end

    describe "POST 'create' while logged in as a normal user" do
      it 'returns http redirect' do
        post 'create', profile_question_answer: {the_response: nil}
        # invalid data
        flash[:success].should be_nil
        flash[:error].should == 'Sorry, something went wrong'
        assigns(:profile_question_answer).class.should == ProfileQuestionAnswer
        response.status.should == 302
        response.should redirect_to(stories_url)
      end

      it 'returns http redirect' do
        post 'create', profile_question_answer: valid_params
        # valid data
        flash[:success].should == 'Your answer has been added to your profile.'
        flash[:error].should be_nil
        assigns(:profile_question_answer).class.should == ProfileQuestionAnswer
        response.status.should == 302
        response.should redirect_to(stories_url)
      end
    end

    describe "PUT 'update' while logged in as a normal user" do
      it 'returns http redirect' do
        put 'update', id: profile_question_answer.id,
                      profile_question_answer: {the_response: nil}
        # invalid data
        flash[:success].should be_nil
        flash[:error].should == 'Sorry, something went wrong'
        assigns(:profile_question_answer).class.should == ProfileQuestionAnswer
        response.status.should == 302
        response.should redirect_to(stories_url)
      end

      it 'returns http redirect' do
        put 'update', id: profile_question_answer.id,
                      profile_question_answer: {the_response: 'Something'}
        # valid data
        flash[:success].should == 'Your answer has been updated on your profile.'
        flash[:error].should be_nil
        assigns(:profile_question_answer).class.should == ProfileQuestionAnswer
        response.status.should == 302
        response.should redirect_to(stories_url)
      end
    end

    describe "DELETE 'destroy' while logged in as a normal user" do
      it 'returns http redirect' do
        put 'destroy', id: profile_question_answer.id
        flash[:success].should == 'Your answer has been removed from your profile.'
        flash[:error].should be_nil
        assigns(:profile_question_answer).class.should == ProfileQuestionAnswer
        response.status.should == 302
        response.should redirect_to(stories_url)
      end
    end

  end

  context 'Use case - logged in as a contributor user' do

    render_views

    let(:log_them_in)      { UserSession.create(contributor_user) }

    before(:each) do
      activate_authlogic # Required for Authlogic
      log_them_in
      request.env['HTTP_REFERER'] = stories_url
      profile_question_answer.user_id = contributor_user.id; profile_question_answer.save
    end

    describe "POST 'create' while logged in as a contributor user" do
      it 'returns http redirect' do
        post 'create', profile_question_answer: {the_response: nil}
        # invalid data
        flash[:success].should be_nil
        flash[:error].should == 'Sorry, something went wrong'
        assigns(:profile_question_answer).class.should == ProfileQuestionAnswer
        response.status.should == 302
        response.should redirect_to(stories_url)
      end

      it 'returns http redirect' do
        post 'create', profile_question_answer: valid_params
        # valid data
        flash[:success].should == 'Your answer has been added to your profile.'
        flash[:error].should be_nil
        assigns(:profile_question_answer).class.should == ProfileQuestionAnswer
        response.status.should == 302
        response.should redirect_to(stories_url)
      end
    end

    describe "PUT 'update' while logged in as a contributor user" do
      it 'returns http redirect' do
        put 'update', id: profile_question_answer.id,
            profile_question_answer: {the_response: nil}
        # invalid data
        flash[:success].should be_nil
        flash[:error].should == 'Sorry, something went wrong'
        assigns(:profile_question_answer).class.should == ProfileQuestionAnswer
        response.status.should == 302
        response.should redirect_to(stories_url)
      end

      it 'returns http redirect' do
        put 'update', id: profile_question_answer.id,
            profile_question_answer: {the_response: 'Something'}
        # valid data
        flash[:success].should == 'Your answer has been updated on your profile.'
        flash[:error].should be_nil
        assigns(:profile_question_answer).class.should == ProfileQuestionAnswer
        response.status.should == 302
        response.should redirect_to(stories_url)
      end
    end

    describe "DELETE 'destroy' while logged in as a contributor user" do
      it 'returns http redirect' do
        put 'destroy', id: profile_question_answer.id
        flash[:success].should == 'Your answer has been removed from your profile.'
        flash[:error].should be_nil
        assigns(:profile_question_answer).class.should == ProfileQuestionAnswer
        response.status.should == 302
        response.should redirect_to(stories_url)
      end
    end

  end

  context 'Use case - logged in as a curator user' do

    render_views

    let(:log_them_in)      { UserSession.create(curator_user) }

    before(:each) do
      activate_authlogic # Required for Authlogic
      log_them_in
      request.env['HTTP_REFERER'] = stories_url
      profile_question_answer.user_id = curator_user.id; profile_question_answer.save
    end

    describe "POST 'create' while logged in as a curator user" do
      it 'returns http redirect' do
        post 'create', profile_question_answer: {the_response: nil}
        # invalid data
        flash[:success].should be_nil
        flash[:error].should == 'Sorry, something went wrong'
        assigns(:profile_question_answer).class.should == ProfileQuestionAnswer
        response.status.should == 302
        response.should redirect_to(stories_url)
      end

      it 'returns http redirect' do
        post 'create', profile_question_answer: valid_params
        # valid data
        flash[:success].should == 'Your answer has been added to your profile.'
        flash[:error].should be_nil
        assigns(:profile_question_answer).class.should == ProfileQuestionAnswer
        response.status.should == 302
        response.should redirect_to(stories_url)
      end
    end

    describe "PUT 'update' while logged in as a curator user" do
      it 'returns http redirect' do
        put 'update', id: profile_question_answer.id,
            profile_question_answer: {the_response: nil}
        # invalid data
        flash[:success].should be_nil
        flash[:error].should == 'Sorry, something went wrong'
        assigns(:profile_question_answer).class.should == ProfileQuestionAnswer
        response.status.should == 302
        response.should redirect_to(stories_url)
      end

      it 'returns http redirect' do
        put 'update', id: profile_question_answer.id,
            profile_question_answer: {the_response: 'Something'}
        # valid data
        flash[:success].should == 'Your answer has been updated on your profile.'
        flash[:error].should be_nil
        assigns(:profile_question_answer).class.should == ProfileQuestionAnswer
        response.status.should == 302
        response.should redirect_to(stories_url)
      end
    end

    describe "DELETE 'destroy' while logged in as a curator user" do
      it 'returns http redirect' do
        put 'destroy', id: profile_question_answer.id
        flash[:success].should == 'Your answer has been removed from your profile.'
        flash[:error].should be_nil
        assigns(:profile_question_answer).class.should == ProfileQuestionAnswer
        response.status.should == 302
        response.should redirect_to(stories_url)
      end
    end

  end

  context 'Use case - logged in as a admin user' do

    render_views

    let(:log_them_in)      { UserSession.create(admin_user) }

    before(:each) do
      activate_authlogic # Required for Authlogic
      log_them_in
      request.env['HTTP_REFERER'] = stories_url
    end

    describe "POST 'create' while logged in as a admin user" do
      it 'returns http redirect' do
        post 'create', profile_question_answer: {the_response: nil}
        # invalid data
        flash[:success].should be_nil
        flash[:error].should == 'Sorry, something went wrong'
        assigns(:profile_question_answer).class.should == ProfileQuestionAnswer
        response.status.should == 302
        response.should redirect_to(stories_url)
      end

      it 'returns http redirect' do
        post 'create', profile_question_answer: valid_params
        # valid data
        flash[:success].should == 'Your answer has been added to your profile.'
        flash[:error].should be_nil
        assigns(:profile_question_answer).class.should == ProfileQuestionAnswer
        response.status.should == 302
        response.should redirect_to(stories_url)
      end
    end

    describe "PUT 'update' while logged in as a admin user" do
      it 'returns http redirect' do
        put 'update', id: profile_question_answer.id,
            profile_question_answer: {the_response: nil}
        # invalid data
        flash[:success].should be_nil
        flash[:error].should == 'Sorry, something went wrong'
        assigns(:profile_question_answer).class.should == ProfileQuestionAnswer
        response.status.should == 302
        response.should redirect_to(stories_url)
      end

      it 'returns http redirect' do
        put 'update', id: profile_question_answer.id,
            profile_question_answer: {the_response: 'Something'}
        # valid data
        flash[:success].should == 'Your answer has been updated on your profile.'
        flash[:error].should be_nil
        assigns(:profile_question_answer).class.should == ProfileQuestionAnswer
        response.status.should == 302
        response.should redirect_to(stories_url)
      end
    end

    describe "DELETE 'destroy' while logged in as a admin user" do
      it 'returns http redirect' do
        put 'destroy', id: profile_question_answer.id
        flash[:success].should == 'Your answer has been removed from your profile.'
        flash[:error].should be_nil
        assigns(:profile_question_answer).class.should == ProfileQuestionAnswer
        response.status.should == 302
        response.should redirect_to(stories_url)
      end
    end

  end

end
