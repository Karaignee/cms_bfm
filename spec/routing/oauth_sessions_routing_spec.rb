require 'spec_helper'

describe OauthSessionsController do
  describe 'routing' do

    it 'routes to #create' do
      get('/auth/friend_face/callback').should route_to('oauth_sessions#create',
                                                       provider: 'friend_face')
      get('/oauth_sessions/create').should route_to('oauth_sessions#create')
    end

    it 'routes to user_sessions#new' do
      get('/auth/failure').should route_to('user_sessions#new')
    end

    it 'routes to #omniauth_failure' do
      get('/oauth_sessions/omniauth_failure').should route_to('oauth_sessions#omniauth_failure')
    end

    it 'routes to #edit' do
      get('/oauth_sessions/1/edit').should route_to('oauth_sessions#edit', id: '1')
    end

    it 'routes to #update' do
      put('/oauth_sessions/1').should route_to('oauth_sessions#update', id: '1')
    end

    it 'routes to #email_exists' do
      get('/oauth_sessions/email_exists').should route_to('oauth_sessions#email_exists')
    end

  end
end
