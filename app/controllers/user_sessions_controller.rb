class UserSessionsController < ApplicationController

  protect_from_forgery except: :new
  before_action :logged_out_required, only: [:new, :create]
  before_action :logged_in_required,  only: :destroy
  before_action :get_variables, only: [:new, :create]

  def new
    reset_session
    @user_session = UserSession.new
    @special_body_class = 'bfm-sign-in'
  end

  def create
    @user_session = UserSession.new(allowed_params)
    if @user_session.save
      #flash[:success] = 'Welcome back!'
      redirect_back_or_default root_url
    else
      flash[:error] = 'Sign-in failed: ' + (@user_session.errors.full_messages.to_sentence if Rails.env.test?).to_s
      render :new
    end
  end

  def destroy
    delete_facebook_cookie
    current_user_session.destroy
    flash[:success] = 'You are now logged out'
    redirect_to root_url
  end

  protected

  def get_variables
    @special_body_class = 'bfm-no-jumbotron'
  end

  def allowed_params
    params.require(:user_session).permit(:email, :password)
  end

end
