require 'spec_helper'

describe Api::EmailYokeController do

  let!(:valid_params) { {email: 'john@example.com', source: 'some-source'} }

  context 'Nobody logged in' do

    before(:each) do
      request.stub!(:user_agent).and_return('Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1
FireFox out put is below')
    end

    it 'should respond with 200 to empty params' do
      post :create
      response.status.should == 200
    end

    it 'should respond with 200 to valid params' do
      post :create, valid_params
      response.status.should == 200
    end

    it 'should not create a record with invalid params' do
      post :create, email: nil, source: nil
      PreRegistration.all.count.should == 0
    end

    it 'should create a valid record with valid params' do
      post :create, valid_params
      pr = PreRegistration.first
      pr.should_not be_nil
      pr.email.should == valid_params[:email]
      pr.source.should == valid_params[:source]
    end
  end

end
