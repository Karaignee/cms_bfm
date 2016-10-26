require 'spec_helper'

describe ProfileQuestionAnswersController do
  describe 'routing' do

    it 'routes to #create' do
      post('/profile_question_answers').should route_to('profile_question_answers#create')
    end

    it 'routes to #update' do
      put('/profile_question_answers/1').should route_to('profile_question_answers#update', id: '1')
    end

    it 'routes to #destroy' do
      delete('/profile_question_answers/1').should route_to('profile_question_answers#destroy', id: '1')
    end

  end
end
