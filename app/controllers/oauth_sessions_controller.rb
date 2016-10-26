class OauthSessionsController < ApplicationController

  protect_from_forgery except: :create
  before_action :logged_out_required
  before_action :get_variables

  def create
    auth = OmniauthAuthorization.get_or_make(permitted_params)
    if auth && auth.user
      # Got an email address from FB
      UserSession.create(auth.user, remember_me: true)
      flash[:success] = 'Welcome back'
      redirect_to root_url
    elsif auth && auth.user.nil?
      # didn't get an email address from FB
      redirect_to edit_oauth_session_url(auth.id, source: params[:source].to_s)
    else
      flash[:error] = 'You have not been logged in'
      redirect_to sign_in_url
    end
  end

  def edit
    # We're here because the social network didn't give us an email.
    # Now, we're going to ask for it
    @auth = OmniauthAuthorization.where(id: params[:id].to_i, email: nil, user_id: nil).first
  end

  def update
    @auth = OmniauthAuthorization.link_user_and_auth(params[:id].to_i, params[:omniauth_authorization][:email].to_s, params[:password].to_s, params[:country_id].to_i, params[:time_zone].to_s)
    if @auth.user
      UserSession.create(@auth.user)
      flash[:success] = 'Thank you - welcome back!'
      redirect_to root_url
    else
      render :edit
    end
  end

  def omniauth_failure
    flash[:error] = 'Failed to sign in using Facebook'
    redirect_to sign_in_url
  end

  def email_exists
    # This is a possible attack vector
    auth = OmniauthAuthorization.where(id: params[:id].to_i, email: nil, user_id: nil).first
    user = User.where(email: params[:email]).first
    if user
      password_ok = user.valid_password?(params[:password].to_s)
    else
      password_ok = false
    end
    render json: {answer: (!auth.nil? && !user.nil? && password_ok)} # true or false
  end

  protected

  def get_variables
    @countries = Country.all_in_order
  end

  def permitted_params
    ActionController::Parameters.new(env['omniauth.auth']).permit(:provider, :uid, info: [:email, :name, :first_name, :last_name, :image, :token, :verified, urls: [:Facebook]], credentials: [:token, :expires_at, :expires], extra: [raw_info: [:id, :email, :first_name, :gender, :last_name, :link, :locale, :name, :timezone, :updated_time, :verified]])
    # For sample data, see spec/controllers/oauth_sessions_controller_spec.rb
  end

end

