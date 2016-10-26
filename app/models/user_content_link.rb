# == Schema Information
#
# Table name: user_content_links
#
#  id                         :integer          not null, primary key
#  user_id                    :integer
#  bourbon_article_id         :integer
#  profile_id                 :integer
#  profile_question_answer_id :integer
#  preference                 :string(255)
#  score                      :integer          default(0)
#  created_at                 :datetime
#  updated_at                 :datetime
#

class UserContentLink < ActiveRecord::Base


  # Constants
  PREFERENCES = [
          {id: 'recommend', public_name: 'recommend?', activated_name: 'recommended',
                score: 10, visible: true},
          {id: 'bookmark', public_name: 'bookmark?', activated_name: 'bookmarked',
                score: 1, visible: false},
          {id: 'have', public_name: 'have?', activated_name: 'have',
                score: 20, visible: true},
          {id: 'want', public_name: 'want?', activated_name: 'want',
                score: 5, visible: true},
          {id: 'no_thanks', public_name: 'not for me', activated_name: 'not for you',
                score: 0, visible: false},
          {id: 'follow', public_name: 'follow', activated_name: 'following',
                score: 10, visible: true}
  ]
  PREFERENCE_IDS = PREFERENCES.map {|x| x[:id]}

  # relationships
  belongs_to :user
  belongs_to :bourbon_article
  belongs_to :profile, class_name: 'User', foreign_key: :profile_id
  belongs_to :profile_question_answer

  # validation
  validates :user_id, presence: true, 
            numericality: {only_integer: true, greater_than: 0}
  validates :bourbon_article_id, allow_nil: true,
            numericality: {only_integer: true, greater_than: 0}
  validates :profile_id, allow_nil: true, 
            numericality: {only_integer: true, greater_than: 0}
  validates :profile_question_answer_id, allow_nil: true, 
            numericality: {only_integer: true, greater_than: 0}
  validates :preference, inclusion: {in: PREFERENCE_IDS}
  validates :score, presence: true, 
            numericality: {only_integer: true, greater_than_or_equal_to: 0}

  # callbacks

  before_validation :assign_score, on: :create
  before_destroy :check_dependencies

  # scopes

  scope :all_in_order, -> { order(:user_id) }
  scope :bookmark, -> { where(preference: 'bookmark') }
  scope :recommend, -> { where(preference: 'recommend') }
  scope :have, -> { where(preference: 'have') }
  scope :no_thanks, -> { where(preference: 'no_thanks') }
  scope :want, -> { where(preference: 'want') }
  scope :follow, -> { where(preference: 'follow') }

  # class methods

  def self.preference_named(the_name)
    PREFERENCES.find {|x| x[:public_name] == the_name}
  end

  def self.preference_id(the_id)
    PREFERENCES.find {|x| x[:id] == the_id}
  end

  def self.visible_preferences
    PREFERENCES.select {|x| x[:visible]}
  end

  # instance methods
  
  def destroyable?
    true
  end

  protected

  def assign_score
    if PREFERENCE_IDS.include?(self.preference)
      self.score = UserContentLink.preference_id(self.preference)[:score]
    end
  end

  def check_dependencies
    unless self.destroyable?
      errors.add(:base, "Couldn't be deleted because dependencies exist")
      false
    end
  end

end
