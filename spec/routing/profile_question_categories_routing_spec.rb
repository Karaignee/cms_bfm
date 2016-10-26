require 'spec_helper'

describe ProfileQuestionCategoriesController do
  describe 'routing' do

    it 'routes to #index' do
      get('/profile_question_categories').should route_to('profile_question_categories#index')
    end

    it 'routes to #new' do
      get('/profile_question_categories/new').should route_to('profile_question_categories#new')
    end

    it 'routes to #show' do
      get('/profile_question_categories/1').should route_to('profile_question_categories#show', id: '1')
    end

    it 'routes to #edit' do
      get('/profile_question_categories/1/edit').should route_to('profile_question_categories#edit', id: '1')
    end

    it 'routes to #create' do
      post('/profile_question_categories').should route_to('profile_question_categories#create')
    end

    it 'routes to #update' do
      put('/profile_question_categories/1').should route_to('profile_question_categories#update', id: '1')
    end

    it 'routes to #destroy' do
      delete('/profile_question_categories/1').should route_to('profile_question_categories#destroy', id: '1')
    end

  end
end
