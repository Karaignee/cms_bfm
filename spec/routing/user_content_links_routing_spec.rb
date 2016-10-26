require 'spec_helper'

describe UserContentLinksController do
  describe 'routing' do

    it 'routes to #create' do
      post('/user_content_links').should route_to('user_content_links#create')
    end

    it 'routes to #destroy' do
      delete('/user_content_links/1').should route_to('user_content_links#destroy', id: '1')
    end

  end
end
