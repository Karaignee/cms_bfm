# == Schema Information
#
# Table name: brands
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class Brand < ActiveRecord::Base

  # Constants

  # relationships
  has_many :gear_pages
  belongs_to :gear_pages
  has_attached_file :profile_image, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"


  # validation
  #validates :name, presence: true
  #validates_attachment_content_type :profile_image, :content_type => /\Aimage\/.*\Z/, if => form_upload?

# def form_upload?
#   # something to confirm whether or not this brand is being imported via csv or is coming from the browser
# end


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
