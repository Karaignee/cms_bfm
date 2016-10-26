require 'spec_helper'

describe PasswordResetsController do
  describe 'routing' do

    it 'routes to #new' do
      get('/password_resets/new').should route_to('password_resets#new')
    end

    it 'routes to password_resets/token/:id' do
      get('/password_resets/token/abc123').should route_to('password_resets#edit', id: 'abc123')
    end

    it 'routes to #edit' do
      get('/password_resets/1/edit').should route_to('password_resets#edit', id: '1')
    end

    it 'routes to #create' do
      post('/password_resets').should route_to('password_resets#create')
    end

    it 'routes to #update' do
      put('/password_resets/1').should route_to('password_resets#update', id: '1')
    end

  end
end
