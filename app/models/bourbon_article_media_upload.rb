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

class BourbonArticleMediaUpload < ActiveRecord::Base

  # Constants

  # relationships
  belongs_to :bourbon_article
  belongs_to :media_upload
  belongs_to :user

  # validation
  validates :bourbon_article_id, presence: true, numericality: {only_integer: true, greater_than: 0}
  validates :media_upload_id, presence: true, numericality: {only_integer: true, greater_than: 0}
  validates :user_id, presence: true, numericality: {only_integer: true, greater_than: 0}

  # callbacks
  before_destroy :check_dependencies

  # scopes
  scope :all_in_order, -> { order(:bourbon_article_id) }

  # class methods

  # instance methods
  def destroyable?
    true
  end

  protected

  def check_dependencies
    unless self.destroyable?
      errors.add(:base, "Couldn't be deleted because dependencies exist")
      false
    end
  end

end
