require 'spec_helper'

describe Api::EmailYokeController do
  describe 'routing' do

    it 'routes to #create' do
      post('/api/email_yoke').should route_to('api/email_yoke#create')
    end

  end
end
