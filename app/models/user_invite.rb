# == Schema Information
#
# Table name: user_invites
#
#  id              :integer          not null, primary key
#  user_id         :integer
#  invited_at      :datetime
#  first_name      :string(255)
#  email           :string(255)
#  activation_code :string(255)
#  invitee_user_id :integer
#  emails_sent     :integer          default(0)
#  created_at      :datetime
#  updated_at      :datetime
#

class UserInvite < ActiveRecord::Base

  # Constants
  STALE_LIMIT_DAYS = 30

  # relationships
  belongs_to :user
  belongs_to :invitee_user, class_name: 'User', foreign_key: :invitee_user_id

  # validation
  validates :user_id, presence: true,
            numericality: {only_integer: true, greater_than: 0}
  validates :invited_at, presence: true
  validates :first_name, presence: true
  validates :activation_code, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :invitee_user_id, allow_nil: true,
            numericality: {only_integer: true, greater_than: 0}
  validates :emails_sent, presence: true,
            numericality: {only_integer: true, greater_than_or_equal_to: 0}

  # callbacks
  before_validation :add_activation_code, on: :create
  after_create :send_invite_email
  before_destroy :check_dependencies

  # scopes
  scope :all_in_order, -> { order(:user_id, :invited_at) }

  # class methods
  def self.with_code(supplied_code)
    where(activation_code: supplied_code).first
  end

  def self.activated_by_new_user(new_user_id, activation_code)
    invite = UserInvite.with_code(activation_code)
    invite && invite.update_attributes(invitee_user_id: new_user_id) # returns true or false
    # todo: this is an opportunity for an AR transaction
  end

  # instance methods
  def closed?
    !self.invitee_user.nil?
  end

  def destroyable?
    self.invitee_user_id.nil? && self.emails_sent == 0
  end

  def send_invite_email
    if self.invitee_user.nil?
      self.invitee_user_id = nil
      self.emails_sent += 1
      self.invited_at = Proc.new {Time.now}.call
      self.save(validate: false, callbacks: false)
      UserMailer.send_user_invite(self).deliver unless Rails.env.test?
    end
  end

  def stale?
    self.invitee_user_id.nil? && (self.invited_at + STALE_LIMIT_DAYS.days) < Proc.new { Time.now }.call
  end

  def still_open?
    self.invitee_user.nil? && !self.stale?
  end

  protected

  def add_activation_code
    self.activation_code = ApplicationController.generate_random_code(20)
    self.invited_at ||= Proc.new { Time.now }.call
  end

  def check_dependencies
    unless self.destroyable?
      errors.add(:base, "Couldn't be deleted because dependencies exist")
      false
    end
  end

end
