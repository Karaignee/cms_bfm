require 'spec_helper'

describe 'ProfileQuestionCategories' do
  describe 'GET /profile_question_categories' do
    it 'works! (now write some real specs)' do
      get profile_question_categories_path
      response.status.should be(302)
    end
  end
end
