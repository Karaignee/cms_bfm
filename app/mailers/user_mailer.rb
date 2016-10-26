class UserMailer < ActionMailer::Base

  default from: ENV['development_test_gmail_address']
  layout 'email_template'

  def confirm_your_registration(user)
    set_server
    @user = user
    mail(to: @user.email, subject: 'Welcome to Bourbon FM!')
  end

  def reset_your_password(user)
    set_server
    @user = user
    mail(to: @user.email, subject: 'Reset your password at Bourbon.FM')
  end

  def send_user_invite(invitation)
    set_server
    @user_invite = invitation
    mail(to: @user_invite.email, cc: @user_invite.user.email, subject: 'Come join Bourbon.fm')
  end

  protected

  def set_server
    if Rails.env.production?
      'https://bourbon.fm/'
    elsif Rails.env.staging?
      'https://staging.bourbon.fm/'
    else
      'http://localhost:3000/'
    end
  end

end
