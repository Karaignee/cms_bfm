require 'spec_helper'

describe UsersHelper do

  describe 'image_url' do

    describe 'normal user' do
      it 'gets the image from gravatar' do
        user = FactoryGirl.build(:user)

        expect(helper.user_image_url(user, size: 30)).to eql(user.gravatar_url(30))
      end
    end

    describe 'facebook user' do
      it 'gets the image from facebook' do
        user = FactoryGirl.create(:facebook_user)

        expect(helper.user_image_url(user, size: 30)).to match /graph.facebook.com/
      end
    end

  end

end
