require 'spec_helper'

describe ProfileQuestionsController do
  describe 'routing' do

    it 'routes to #index' do
      get('/profile_questions').should route_to('profile_questions#index')
    end

    it 'routes to #new' do
      get('/profile_questions/new').should route_to('profile_questions#new')
    end

    it 'routes to #show' do
      get('/profile_questions/1').should route_to('profile_questions#show', id: '1')
    end

    it 'routes to #edit' do
      get('/profile_questions/1/edit').should route_to('profile_questions#edit', id: '1')
    end

    it 'routes to #create' do
      post('/profile_questions').should route_to('profile_questions#create')
    end

    it 'routes to #update' do
      put('/profile_questions/1').should route_to('profile_questions#update', id: '1')
    end

    it 'routes to #destroy' do
      delete('/profile_questions/1').should route_to('profile_questions#destroy', id: '1')
    end

  end
end
