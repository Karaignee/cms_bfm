# == Schema Information
#
# Table name: countries
#
#  id            :integer          not null, primary key
#  name          :string(255)
#  in_the_eu     :boolean
#  running_order :integer
#  iso_code      :string(255)
#  country_tld   :string(255)
#  created_at    :datetime
#  updated_at    :datetime
#

class Country < ActiveRecord::Base


  # relationships
  has_many :users

  # validation
  validates :country_tld, presence: true
  validates :in_the_eu, inclusion: {in: [true, false, 'true', 'false']}
  validates :iso_code, presence: true
  validates :name, presence: true, uniqueness: true
  validates :running_order, allow_blank: nil, allow_nil: true, numericality: {only_integer: true, greater_than: 0}

  # callbacks
  before_destroy :check_for_dependents

  # scopes
  scope :all_in_order, -> { order(:running_order, :name) }
  scope :eu_only,      -> { where(in_the_eu: true) }

  # instance methods
  def destroyable?
    self.users.empty?
  end

  # class methods
  def self.named(a_name)
    where(name: a_name).first
  end

  protected

  def check_for_dependents
    unless self.destroyable?
      errors.add(:base, "Couldn't be deleted because dependencies exist")
      false
    end
  end

end
