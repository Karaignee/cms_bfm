class PasswordResetsController < ApplicationController

  before_action :logged_out_required

  def new
  end

  def create
    User.send_password_reset(params[:email])
  end

  def edit
    @token = params[:id]
    @user = User.where(password_reset_token: params[:id].to_s, active: false).first
    unless @user
      flash[:error] = 'Sorry, something went wrong with your request. Please start over.'
      redirect_to new_password_reset_url
    end
  end

  def update
    @user = User.validate_password_reset_code(params[:id].to_s)
    if @user
      @user.reset_password_with_code(params[:id].to_s, params[:password].to_s, params[:password_confirmation].to_s)
      flash[:success] = 'Your password has been reset, and you are re-activated.'
      UserSession.create(@user)
      redirect_to root_url
    else
      flash[:error] = 'Sorry, something went wrong. Please start over.'
      redirect_to new_password_reset_url
    end
  end

  protected

  def valid_params
    params.permit(:id, :password, :password_confirmation, :email)
  end
end
