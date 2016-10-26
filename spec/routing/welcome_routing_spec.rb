require 'spec_helper'

describe WelcomeController do
  describe 'routing' do

    it 'routes to #landing' do
      get('/').should route_to('welcome#landing')
    end

    it 'routes to #normal_user' do
      get('/welcome/normal_user').should route_to('welcome#normal_user')
    end

    it 'routes to #contributor' do
      get('/welcome/contributor').should route_to('welcome#contributor')
    end

    it 'routes to #curator' do
      get('/welcome/curator').should route_to('welcome#curator')
    end

    it 'routes to #admin' do
      get('/welcome/admin').should route_to('welcome#admin')
    end

    it 'routes to #people' do
      get('/welcome/people').should route_to('welcome#people')
    end
    it 'routes to #collections' do
      get('/welcome/collections').should route_to('welcome#collections')
    end

    it 'routes to #privacy' do
      get('/privacy').should route_to('welcome#privacy')
    end

    it 'routes to #search' do
      post('search').should route_to('welcome#search')
    end

    it 'routes to #tag_search' do
      get('/tag_search/something').should route_to('welcome#tag_search', search_for_tag: 'something')
    end

  end
end
