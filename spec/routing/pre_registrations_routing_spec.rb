require 'spec_helper'

describe PreRegistrationsController do
  describe 'routing' do

    it 'routes to #index' do
      get('/pre_registrations').should route_to('pre_registrations#index')
    end

    it 'routes to #new' do
      get('/pre_registrations/new').should route_to('pre_registrations#new')
    end

    it 'routes to #show' do
      get('/pre_registrations/1').should route_to('pre_registrations#show', :id => '1')
    end

    it 'routes to #edit' do
      get('/pre_registrations/1/edit').should route_to('pre_registrations#edit', :id => '1')
    end

    it 'routes to #create' do
      post('/pre_registrations').should route_to('pre_registrations#create')
    end

    it 'routes to #update' do
      put('/pre_registrations/1').should route_to('pre_registrations#update', :id => '1')
    end

    it 'routes to #destroy' do
      delete('/pre_registrations/1').should route_to('pre_registrations#destroy', :id => '1')
    end

  end
end
