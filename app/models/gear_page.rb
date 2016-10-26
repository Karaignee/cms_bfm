# == Schema Information
#
# Table name: gear_pages
#
#  id               :integer          not null, primary key
#  name             :string(255)
#  description      :text
#  brand_id         :integer
#  artist_id        :integer
#  genre_id         :integer
#  ancestry         :string(255)
#  created_at       :datetime
#  updated_at       :datetime
#  gear_category_id :integer
#

class GearPage < ActiveRecord::Base

  # Constants

  # relationships
  belongs_to :brand
  has_and_belongs_to_many :artist
  belongs_to :genre
  # belongs_to :gear_category

  has_ancestry

  has_attached_file :profile_image, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :profile_image, :content_type => /\Aimage\/.*\Z/

  # validation
  #validates :name, presence: true
  #validates :description, presence: true
  #validates :brand, presence: true
  #validates :artist, presence: true
  #validates :genre, presence: true
  #validates :ancestry, presence: true

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
