require 'spec_helper'
require 'support/users_and_groups_setup'

describe 'BourbonArticles' do

  include_context 'users and groups setup'

  describe 'GET /bourbon_articles' do
    xit 'works! (now write some real specs)' do
      get bourbon_articles_path
      response.status.should be(200)
    end
  end
end
