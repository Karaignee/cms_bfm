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

class MediaUpload < ActiveRecord::Base

  has_attached_file :upload # the basic scenario

  def conditionally_attach_a_file
    if self.media_type == 'image'
      self.class. has_attached_file :upload, styles: {
              thumb: '100x100>',
              square: '200x200#',
              medium: '300x300>',
              story_mini_view_7: '674x300#',
              story_mini_view_5: '476x300#'
      }
    end
    # The # at the end of the sizes forces the height to be fixed at that size
    # see http://stackoverflow.com/questions/19372365/paperclip-dropbox-how-can-i-setup-a-conditional-has-attached-file
  end

  # Constants
  MEDIA_TYPES = %w(image audio video)

  # relationships
  belongs_to :user
  has_many :bourbon_article_header_images, class_name: 'BourbonArticle',
           foreign_key: :image_id
  # has_many :bourbon_articles, through: :bourbon_article_media_upload

  # validation
  validates :user_id, presence: true, numericality: {only_integer: true, greater_than: 0}
  #validates :description, presence: true, length: {maximum: 255}
  #validates :tags, presence: true, length: {maximum: 255}
  validates :media_type, inclusion: {in: MEDIA_TYPES}
  validates_attachment :upload, content_type: { content_type: %w(image/jpg image/jpeg image/png image/gif audio/mpeg audio/x-aiff audio/aac audio/ac3 audio/m4a audio/x-m4a audio/wav audio/ogg) }, if: '!Rails.env.test?'
  validates_attachment :upload, presence: true, if: 'Rails.env.test?'
  #validates :alt_tag, presence: true, length: {maximum: 255}
  validates :upload, presence: true, on: :create, if: "media_type != 'video'"
  validates :video_embed_code, presence: true, if: "media_type == 'video'"

  # callbacks
  after_initialize :conditionally_attach_a_file
  before_destroy :check_dependencies

  # scopes
  scope :all_in_order, -> { order(:user_id) }
  scope :just_images, -> { where(media_type: 'image') }
  scope :just_audio, -> { where(media_type: 'audio') }
  scope :just_video, -> { where(media_type: 'video') }

  # class methods
  def self.available_for(user_id)
    MediaUpload.where('user_id = ? OR publicly_available = ?', user_id, true).all_in_order
  end

  # instance methods
  def destroyable?
    self.bourbon_article_header_images.empty?
  end

  def text_style
    self.make_text_bright ? 'color: #eee !important;' : ''
  end

  protected

  def check_dependencies
    if self.destroyable?
      self.upload = nil
      self.save
      true
    else
      errors.add(:base, "Couldn't be deleted because dependencies exist")
      false
    end
  end

end
