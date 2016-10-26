require 'spec_helper'
require 'authlogic/test_case'
require 'support/users_and_groups_setup'

describe 'Users' do

  include_context 'users and groups setup'

  context 'Nobody logged in...' do
    describe 'GET /users' do
      it 'redirects to sign-in' do
        get users_path
        response.status.should be(302)
        response.should redirect_to(sign_in_url)
      end
    end

    describe 'Sign-up process' do
      it 'should allow sign-up' do

      end

      it 'should allow email activation' do

      end

      it 'should log the new user in on activation' do

      end

    end

    describe 'Password reset process' do
      it 'should send password reset when requested' do

      end
    end
  end

end