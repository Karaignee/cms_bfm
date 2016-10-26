# == Schema Information
#
# Table name: omniauth_authorizations
#
#  id                     :integer          not null, primary key
#  provider               :string(255)
#  uid                    :string(255)
#  name                   :string(255)
#  first_name             :string(255)
#  last_name              :string(255)
#  email                  :string(255)
#  oauth_token            :string(255)
#  oauth_token_expires_at :datetime
#  user_id                :integer
#  created_at             :datetime
#  updated_at             :datetime
#

class OmniauthAuthorization < ActiveRecord::Base

  # Constants

  # relationships
  belongs_to :user

  # validation
  validates :provider, presence: true
  validates :uid, presence: true
  validates :name, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  #validates :email, presence: true
  validates :oauth_token, presence: true
  validates :oauth_token_expires_at, presence: true
  validates :user_id, allow_nil: true,
            numericality: {only_integer: true, greater_than: 0}

  # callbacks
  before_create :find_or_create_user
  before_destroy :check_dependencies

  # scopes
  scope :all_in_order, -> { order(:provider) }
  scope :current, lambda { where('oauth_token_expires_at > ?', Proc.new{Time.now}.call ) }
  scope :most_recent, -> { order("updated_at DESC") }

  # class methods
  def self.get_or_make(oauth_hash)
    auth = OmniauthAuthorization.current.where(provider: oauth_hash['provider'], uid: oauth_hash['uid']).first
    unless auth
      auth = OmniauthAuthorization.make_from_hash(oauth_hash)
    end
    auth
  end

  def self.make_from_hash(oauth_hash)
    x = new(
      provider:               oauth_hash['provider'],
      uid:                    oauth_hash['uid'],
      name:                   oauth_hash['info']['name'],
      first_name:             oauth_hash['info']['first_name'] ||
                              oauth_hash['info']['name'].split(' ').first,
      last_name:              oauth_hash['info']['last_name'] ||
                              oauth_hash['info']['name'].split(' ').last,
      email:                  oauth_hash['info']['email'], # ||
                                # oauth_hash['uid'] + '@' + oauth_hash['provider'] + '.com',
      oauth_token:            oauth_hash['credentials']['token'],
      oauth_token_expires_at: Time.at(oauth_hash['credentials']['expires_at'].to_i)
      # user_id gets set up in a callback
    )
    x.user_id = x.find_or_create_user if x.email.length > 0
    x.save
    return x
  end

  def self.link_user_and_auth(auth_id, email_address, password, country_id, time_zone)
    auth = where(id: auth_id, email: nil, user_id: nil).first
    if auth && email_address
      auth.email = email_address
      auth.user_id = auth.find_or_create_user(password, country_id, time_zone)
      auth.save
      auth
    else
      nil # couldn't find the one you were looking for
    end
  end

  # instance methods
  def destroyable?
    true
  end

  def find_or_create_user(user_password=nil, country_id=nil, time_zone=nil)
    the_password = ApplicationController.generate_random_code(64)
    the_user = User.where(email: self.email).first
    if the_user && user_password.nil?
      return the_user.id
    elsif the_user
      if the_user.valid_password?(user_password)
        return the_user.id
      else
        return nil
      end
    else
      return User.create(
        first_name: self.first_name,
        last_name: self.last_name,
        email: self.email,
        user_group_id: UserGroup.default_group.try(:id),
        password: user_password || the_password,
        password_confirmation: user_password || the_password,
        country_id: country_id || Country.where(name: 'Ireland').first.id,
        time_zone: time_zone || 'Dublin',
        active: true
      ).id
    end
  end

  protected

  def check_dependencies
    unless self.destroyable?
      errors.add(:base, "Couldn't be deleted because dependencies exist")
      false
    end
  end

end
