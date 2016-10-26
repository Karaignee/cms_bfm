# == Schema Information
#
# Table name: user_groups
#
#  id                                :integer          not null, primary key
#  name                              :string(255)
#  description                       :text
#  is_admin                          :boolean
#  is_curator                        :boolean
#  is_contributor                    :boolean
#  created_at                        :datetime
#  updated_at                        :datetime
#  limit_user_invites_for_this_group :boolean          default(TRUE)
#  invites_limit_per_user            :integer          default(0)
#

class UserGroup < ActiveRecord::Base

  # TODO: Definitions
  # =================
  # Contributor:   someone who can write an article = author
  #
  # Curator:       someone who can write an article on behalf of someone else, and can edit
  #                someone else's article, and can approve someone else's article.
  #
  # Collaborator:  Collaborator: someone who jointly works on an article with a contributor
  #                or curator.  They must be a contributor or curator themselves


  # relationships
  has_many :users

  # validation
  validates :name, uniqueness: true, presence: true
  validates :description, presence: true

  # callbacks
  before_destroy :check_dependencies

  # scopes
  scope :all_in_order, -> { order(:name) }
  scope :contributor_groups, -> { where(is_contributor: true) }
  scope :curator_groups, -> { where(is_curator: true) }

  # class methods

  def self.admin_group
    where(is_an_admin: true).first
  end

  def self.contributor_group
    where(is_contributor: true).first
  end

  def self.curator_group
    where(is_curator: true).first
  end

  def self.default_group
    where(is_admin: false, is_contributor: false, is_curator: false).all_in_order.first
  end

  def self.full_list_of_ids
    all.map(&:id)
  end

  # instance methods

  def destroyable?
    self.users.empty? && !self.is_admin
  end

  protected

  def check_dependencies
    unless self.destroyable?
      errors.add(:base, 'Could not be deleted because dependencies exist')
      false
    end
  end

end
