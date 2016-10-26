# == Schema Information
#
# Table name: users
#
#  id                                :integer          not null, primary key
#  first_name                        :string(255)
#  last_name                         :string(255)
#  email                             :string(255)
#  country_id                        :integer
#  latitude                          :float
#  longitude                         :float
#  time_zone                         :string(255)
#  user_group_id                     :integer
#  active                            :boolean          default(FALSE), not null
#  blocked                           :boolean          default(FALSE), not null
#  activation_code                   :string(255)
#  activated_at                      :datetime
#  blocked_by                        :integer
#  password_reset_token              :string(255)
#  password_reset_token_requested_at :datetime
#  password_reset_at                 :datetime
#  crypted_password                  :string(255)      default(""), not null
#  password_salt                     :string(255)      default(""), not null
#  perishable_token                  :string(255)      default("")
#  persistence_token                 :string(255)
#  single_access_token               :string(255)
#  login_count                       :integer          default(0)
#  failed_login_count                :integer          default(0)
#  last_request_at                   :datetime
#  current_login_at                  :datetime
#  last_login_at                     :datetime
#  current_login_ip                  :string(255)
#  last_login_ip                     :string(255)
#  allow_email_alerts                :boolean          default(FALSE)
#  url_code                          :string(255)
#  created_at                        :datetime
#  updated_at                        :datetime
#  remaining_invites                 :integer          default(0)
#  tags                              :string(255)
#  location                          :string(255)
#

class User < ActiveRecord::Base


  # relationships
  has_many   :bourbon_articles # as the writer
  has_many   :gear_pages # as the writer
  has_many   :bourbon_articles_contributed, class_name: 'BourbonArticle',
              foreign_key: :contributor_id
  has_many   :bourbon_articles_curated, class_name: 'BourbonArticle',
              foreign_key: :curator_id
  belongs_to :country
  has_many   :incoming_content_links,
              class_name: 'UserContentLink',
              foreign_key: :profile_id
  has_many   :omniauth_authorizations
  has_many   :profile_question_answers
  has_many   :user_content_links
  has_many   :user_invites
  belongs_to :user_group

  geocoded_by :current_login_ip

  acts_as_authentic do |c|
    if Rails.env.production? || Rails.env.staging?
      c.logged_in_timeout = 30.days
    else
      c.logged_in_timeout = 120.minutes
    end
    # extra code in app/models/user_session.rb makes this enforceable ONLY on admins
  end

  # validation
  validates :email, presence: true, uniqueness: true,
            length: {within: 7..40}, # todo: ,
            format: {with:  /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i,
                      message: 'must be a valid email address.'}
  validates :first_name, presence: true, length: {within: 2..30}
  validates :last_name, presence: true, length: {within: 2..30}
  validates :password, presence: true, length: {minimum: 6}, on: :create
  validates :password, allow_nil: true, allow_blank: true, length: {minimum: 6}, on: :update
  validates_confirmation_of :password, unless: 'password.blank?'
  validates :user_group_id,
            inclusion: {in: Proc.new { UserGroup.full_list_of_ids} }
  validates :country_id, presence: true,
            numericality: {only_integer: true, greater_than: 0}
  validates :time_zone, presence: true

  # callbacks
  before_create :set_url_code
  before_create :grant_user_invites
  before_create :geocode, if: :current_login_ip_changed?
  before_destroy :check_dependencies

  # scopes

  scope :all_in_order, -> { order(:user_group_id, :last_name, :first_name) }

  # instance methods
  def admin?
    self.user_group.is_admin
  end

  def change_password(current, new_password, confirmation)
    if self.valid_password?(current) && new_password == confirmation && new_password.length > 5
      self.password = new_password
      self.password_confirmation = confirmation
      self.save
    else
      false
    end
  end

  def consume_one_invite_credit
    if self.user_group.limit_user_invites_for_this_group
      if self.remaining_invites > 0
        self.remaining_invites -= 1
        self.save!
      else
        Rails.logger.error "User.consume_one_invite_credit: User ##{self.id} sent an unauthorised invite: current balance #{self.remaining_invites}."
      end
    end
  end

  def contributor?
    self.user_group.is_contributor
  end

  def curator?
    self.user_group.is_curator
  end

  def destroyable?
    false
  end 

  def full_name
    self.first_name.titleize + ' ' + self.last_name.gsub('O\'','O\' ').titleize.gsub('O\' ','O\'')
  end

  def gravatar_url(the_size=100)
    # gravatar_id = Digest::MD5::hexdigest(self.login).downcase
    # 'http://gravatar.com/avatar/' + gravatar_id + '.png'
    stripped_email = email.strip
    downcased_email = stripped_email.downcase
    hash = Digest::MD5.hexdigest(downcased_email)
    "http://gravatar.com/avatar/#{hash}?size=#{the_size}"
  end

  # class methods

  def self.activate_with_code(the_code)
    user = User.where(activation_code: the_code).first
    if user
      user.activation_code = nil
      user.active = true
      unless user.save
        Rails.logger.warn 'User.activate_with_code failed to save: ' + user.inspect
      end
      user
    else
      false
    end
  end

  def self.contributors_or_curators
    includes(:user_group).where('user_groups.is_contributor = ? or user_groups.is_curator = ?', true, true).references(:user_group)
  end

  def self.list_of_ids
    User.all.map(&:id)
  end

  def self.search_request(user_search)
    search_result = []
    records = User.where('lower(first_name) LIKE :s or lower(last_name) LIKE :s', s: '%' + user_search.downcase + '%')

    if records.count > 0
      records.uniq.each do |x|
        search_result << {model_name: 'User', url: '/profile/' + x.url_code, name: x.full_name, description: x.full_name + ' is the search result'}
      end
    end
    search_result
  end

  def self.with_url_code(the_url_code)
    where(url_code: the_url_code).first
  end

  # password reset processing - step 1
  def self.send_password_reset(email_address)
    user = User.where(email: email_address).first
    if user
      user.password_reset_token = ApplicationController.generate_random_code(20)
      user.password_reset_token_requested_at = Time.now
      user.crypted_password = 'locked'
      user.active = false
      user.save!
      UserMailer.reset_your_password(user).deliver
    end
  end

  # password reset processing - step 2 and 3
  def self.validate_password_reset_code(the_code)
    User.where(active: false, password_reset_token: the_code).first
  end

  # password reset processing - step 4
  def reset_password_with_code(the_code, new_password_1, new_password_2)
    if self.id == User.validate_password_reset_code(the_code.to_s).try(:id)
      self.password_reset_token = nil
      self.active = true
      self.password = new_password_1.to_s
      self.password_confirmation = new_password_2.to_s
      if self.save
        return self
      else
        Rails.logger.warn 'User.reset_password_with_code failed to save: ' + self.inspect
        return nil
      end
    else
      Rails.logger.warn 'User.reset_password_with_code failed to find a user: ' + the_code.to_s
      return nil
    end
  end

  def self.tagged_with(a_tag)
    where('tags LIKE ?', '%' + a_tag + '%')
  end

  protected

  def check_dependencies
    unless self.destroyable?
      errors.add(:base, "Couldn't be deleted because dependencies exist")
      false
    end
  end

  def grant_user_invites
    if self.user_group.try(:limit_user_invites_for_this_group)
      self.remaining_invites = self.user_group.invites_limit_per_user
    else
      self.remaining_invites = 0
    end
  end

  def set_url_code
    self.url_code = ApplicationController.generate_random_code(20)
  end

end
