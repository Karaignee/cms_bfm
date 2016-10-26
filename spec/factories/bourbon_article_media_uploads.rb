# == Schema Information
#
# Table name: bourbon_article_media_uploads
#
#  id                 :integer          not null, primary key
#  bourbon_article_id :integer
#  media_upload_id    :integer
#  user_id            :integer
#  created_at         :datetime
#  updated_at         :datetime
#

# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :bourbon_article_media_upload do
    bourbon_article_id 1
    media_upload_id 1
    user_id 1
  end
end
