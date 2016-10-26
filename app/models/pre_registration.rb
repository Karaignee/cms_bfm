# == Schema Information
#
# Table name: pre_registrations
#
#  id         :integer          not null, primary key
#  email      :string(255)
#  ip_address :string(255)
#  source     :string(255)
#  created_at :datetime
#  updated_at :datetime
#  user_agent :string(255)
#

class PreRegistration < ActiveRecord::Base


  # relationships

  # validation
  validates :email, presence: true, uniqueness: true,
            format: {with:  /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }
  validates :ip_address, presence: true
  validates :source, presence: true
  validates :user_agent, presence: true

  # callbacks
  before_destroy :check_dependencies

  # scopes
  scope :all_in_order, -> { order(created_at: :desc) }

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
