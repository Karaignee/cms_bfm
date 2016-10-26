require 'spec_helper'

describe UserSessionsController do
  describe 'routing' do
    it 'should go to login' do
      get('/login').should route_to('user_sessions#new')
    end
    it 'should go to log_in' do
      get('/log_in').should route_to('user_sessions#new')
    end
    it 'should go to signin' do
      get('/signin').should route_to('user_sessions#new')
    end
    it 'should go to sign_in' do
      get('/sign_in').should route_to('user_sessions#new')
    end
    it 'should go to new' do
      get('/user_sessions/new').should route_to('user_sessions#new')
    end
    it 'should go to create' do
      post('/user_sessions').should route_to('user_sessions#create')
    end
    it 'should go to logout' do
      get('/logout').should route_to('user_sessions#destroy')
    end
    it 'should go to destroy' do
      delete('/user_sessions/1').should route_to('user_sessions#destroy', id: '1')
    end
  end
end
