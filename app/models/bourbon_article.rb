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

class BourbonArticle < ActiveRecord::Base


  # Constants

  # relationships
  belongs_to :contributor, class_name: 'User', foreign_key: :contributor_id
  belongs_to :curator, class_name: 'User', foreign_key: :curator_id
  belongs_to :image, class_name: 'MediaUpload', foreign_key: :image_id
  # has_many   :uploads, through: :bourbon_article_media_upload
  belongs_to :user
  has_many   :user_content_links
  has_one   :video_upload


  # validation
  with_options if: :ready_for_curation  do |draft|
    draft.validates :article_title, presence: true
    draft.validates :article_subtitle, presence: true
    draft.validates :article_body, presence: true
    draft.validates :article_published_at, presence: true
    #draft.validates :tags, presence: true
    draft.validates :image_id, presence: true, numericality: {only_integer: true, greater_than: 0}
  end
  validates :article_title, uniqueness: true
  validates :contributor_id, presence: true,
            numericality: {only_integer: true, greater_than: 0}
  validates :curator_id, allow_blank: true,
            numericality: {only_integer: true, greater_than: 0}
  validates :user_id, presence: true, numericality: {only_integer: true, greater_than: 0}

  # callbacks
  before_save :set_clickable_title
  before_destroy :check_dependencies

  # scopes
  scope :all_in_order, -> { order(:article_published_at, :article_title) }
  scope :published, lambda { where('visible = ? AND article_published_at < ?', true, Proc.new{Time.now}.call) }
  scope :saved_as_draft, -> { where(ready_for_curation: false) }
  scope :sent_for_review, -> { where('(visible = ? OR visible IS NULL) AND ready_for_curation = ?', false, true) }

  # class methods

  def self.search_request(search_term)
    search_result = []
    records = where('lower(article_body) LIKE :term OR lower(article_subtitle) LIKE :term OR lower(article_title) LIKE :term', term: '%' + search_term.downcase + '%')
    records.each do |x|
      search_result << {model_name: 'Bourbon Article', url: '/stories/' + x.clickable_title, name: x.article_title, description: x.article_body}
    end
    search_result
  end

  def self.tag_search_request(tag_search)
    tag_search_result = []
    records = where('lower(tags) LIKE ?', '%' + tag_search.downcase + '%')

    if records.count > 0
      records.uniq.each do |x|
        tag_search_result << {model_name: 'Bourbon Article', url: '/stories/' + x.clickable_title, name: x.article_title, description: x.article_body}
      end
    end
    tag_search_result
  end

  def self.get_by_id_or_clickable_title(requested_thing)
    where('id = ? OR clickable_title = ?', requested_thing.to_i, requested_thing.to_s).first
  end

  # instance methods

  def destroyable?
    self.user_content_links.empty? && !self.is_active?
  end

  def is_active?
    self.visible == true && self.article_published_at < Proc.new{ Time.now }.call
  end

  protected

  def set_clickable_title
    self.clickable_title = self.article_title.gsub('/', '-').gsub(':', '-').gsub('.', '-').gsub('?', '').gsub(' ','_') + "_#{self.id}"
    # The ID is added on at the end to absolutely guarantee uniqueness
  end

  def check_dependencies
    unless self.destroyable?
      errors.add(:base, "Couldn't be deleted because dependencies exist")
      false
    end
  end

end
