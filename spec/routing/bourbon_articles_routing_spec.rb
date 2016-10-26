require 'spec_helper'

describe BourbonArticlesController do
  describe 'routing' do

    it 'routes to #index' do
      get('/stories').should route_to('bourbon_articles#index')
    end

    it 'routes to #new' do
      get('/stories/new').should route_to('bourbon_articles#new')
    end

    it 'routes to #show' do
      get('/stories/1').should route_to('bourbon_articles#show', id: '1')
    end

    it 'routes to #edit' do
      get('/stories/1/edit').should route_to('bourbon_articles#edit', id: '1')
    end

    it 'routes to #create' do
      post('/stories').should route_to('bourbon_articles#create')
    end

    it 'routes to #update' do
      put('/stories/1').should route_to('bourbon_articles#update', id: '1')
    end

    it 'routes to #destroy' do
      delete('/stories/1').should route_to('bourbon_articles#destroy', id: '1')
    end

  end
end
