require 'spec_helper'

describe UsersController do
  describe 'routing' do

    it 'routes to #index' do
      get('/users').should route_to('users#index')
    end

    it 'routes to #new' do
      get('/users/new').should route_to('users#new')
    end

    it 'routes to #show' do
      get('/users/1').should route_to('users#show', id: '1')
    end

    it 'routes to #edit' do
      get('/users/1/edit').should route_to('users#edit', id: '1')
    end

    it 'routes to #create' do
      post('/users').should route_to('users#create')
    end

    it 'routes to #update' do
      put('/users/1').should route_to('users#update', id: '1')
    end

    it 'routes to #destroy' do
      delete('/users/1').should route_to('users#destroy', id: '1')
    end

    it 'routes to #change_password' do
      put('/change_password').should route_to('users#change_password')
    end

    it 'routes to #activate' do
      get('/activate/abc123').should route_to('users#activate', code: 'abc123')
    end

    it 'routes to #profile' do
      get('/people/val').should route_to('users#profile', url_code: 'val')
    end

  end
end
