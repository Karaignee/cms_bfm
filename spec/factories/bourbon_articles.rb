# == Schema Information
#
# Table name: bourbon_articles
#
#  id                   :integer          not null, primary key
#  article_title        :string(255)
#  contributor_id       :integer
#  curator_id           :integer
#  user_id              :integer
#  article_subtitle     :string(255)
#  article_published_at :datetime
#  image_id             :integer
#  article_body         :text
#  tags                 :string(255)
#  visible              :boolean
#  created_at           :datetime
#  updated_at           :datetime
#  clickable_title      :string(255)
#  ready_for_curation   :boolean          default(FALSE)
#

# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :bourbon_article do
    article_title         'MyString'
    user_id               1
    contributor_id        1
    curator_id            1
    article_subtitle      'MyString'
    article_published_at  '2014-05-20 22:47:19'
    image_id              1
    article_body          'MyText'
    tags                  'MyString, mystring, data'
    visible               true
  end
end
