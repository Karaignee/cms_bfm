# == Schema Information
#
# Table name: video_uploads
#
#  id                 :integer          not null, primary key
#  bourbon_article_id :integer
#  url                :string(255)
#  title              :string(255)
#  description        :text
#  created_at         :datetime
#  updated_at         :datetime
#

class VideoUpload < ActiveRecord::Base

  belongs_to :bourbon_article

end
