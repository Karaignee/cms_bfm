require 'spec_helper'

describe UserInvitesController do
  describe 'routing' do

    it 'routes to #index' do
      get('/user_invites').should route_to('user_invites#index')
    end

    it 'routes to #new' do
      get('/user_invites/new').should route_to('user_invites#new')
    end

    it 'routes to #show' do
      get('/user_invites/1').should route_to('user_invites#show', :id => '1')
    end

    it 'routes to #edit' do
      get('/user_invites/1/edit').should route_to('user_invites#edit', :id => '1')
    end

    it 'routes to #create' do
      post('/user_invites').should route_to('user_invites#create')
    end

    it 'routes to #update' do
      put('/user_invites/1').should route_to('user_invites#update', :id => '1')
    end

    it 'routes to #destroy' do
      delete('/user_invites/1').should route_to('user_invites#destroy', :id => '1')
    end

    it 'routes to #activate' do
      get('/user_invite/activate/ABC123').should route_to('user_invites#activate', :code => 'ABC123')
    end

    it 'routes to #re_send' do
      get('/user_invite/re_send/ABC123').should
    end

  end
end
