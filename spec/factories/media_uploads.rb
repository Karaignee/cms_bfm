# == Schema Information
#
# Table name: media_uploads
#
#  id                  :integer          not null, primary key
#  user_id             :integer
#  description         :string(255)
#  tags                :string(255)
#  media_type          :string(255)
#  created_at          :datetime
#  updated_at          :datetime
#  upload_file_name    :string(255)
#  upload_content_type :string(255)
#  upload_file_size    :integer
#  upload_updated_at   :datetime
#  publicly_available  :boolean
#  video_embed_code    :string(255)
#  alt_tag             :string(255)
#  make_text_bright    :boolean          default(FALSE)
#

# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :media_upload do
    user_id     1
    description 'MyString'
    tags        'MyString'
    media_type  'image'
    alt_tag     'some tag'
    upload      File.new(Rails.root + 'spec/fixtures/images/Rails-logo.png')
    publicly_available true
  end
end
