class UserSession < Authlogic::Session::Base
  # configuration here, see documentation for sub-modules 
  # of Authlogic::Session
  logout_on_timeout true

  def stale?
    user.present? && user.admin? && super
  end

  consecutive_failed_logins_limit 10
end
