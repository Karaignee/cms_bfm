require 'spec_helper'

describe 'ProfileQuestions' do
  describe 'GET /profile_questions' do
    it 'works! (now write some real specs)' do
      # Run the generator again with the --webrat flag if you want to use webrat methods/matchers
      get profile_questions_path
      response.status.should be(302)
    end
  end
end
