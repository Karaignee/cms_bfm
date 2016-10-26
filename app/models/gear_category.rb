# == Schema Information
#
# Table name: gear_categories
#
#  id           :integer          not null, primary key
#  name         :string(255)
#  description  :text
#  gear_page_id :integer
#  created_at   :datetime
#  updated_at   :datetime
#

class GearCategory < ActiveRecord::Base

  # Constants

  # relationships
  has_many :gear_pages

  # validation
  #validates :name, presence: true
  #validates :description, presence: true
  #validates :gear_page, presence: true

  # callbacks
  before_destroy :check_dependencies

  # scopes
  scope :all_in_order, -> { order(:name) }

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
