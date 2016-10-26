class UserInvitesController < ApplicationController

  before_action :logged_in_required, except: :activate
  before_action :admin_required, except: [:activate, :re_send, :create]
  before_action :logged_out_required, only: :activate
  before_action :get_variables, except: [:activate, :re_send]
  before_action :get_invite_using_code, only: [:activate, :re_send]

  def index
    @user_invites = UserInvite.page(params[:page]).per_page(100).all_in_order
  end

  def show
  end

  def new
    @user_invite = UserInvite.new
  end

  def edit
  end

  def create
    @user_invite = UserInvite.new(allowed_params)
    @user_invite.user_id = current_user.id
    if @user_invite.save
      current_user.consume_one_invite_credit
      flash[:success] = 'Invite has been successfully sent'
      if current_user.admin?
        redirect_to user_invites_url
      else
        redirect_to current_user
      end
    else
      render action: :new
    end
  end

  def update
    if @user_invite.update_attributes(allowed_params)
      flash[:success] = 'UserInvite was successfully updated'
      redirect_to user_invites_url
    else
      render action: :edit
    end
  end

  def destroy
    if @user_invite.destroy
      flash[:success] = 'UserInvite has been deleted.'
    else
      flash[:error] = 'UserInvite could not be deleted.'
    end
    redirect_to user_invites_url
  end

  def activate
    if @user_invite && @user_invite.still_open?
      @user = User.new(first_name: @user_invite.first_name, email: @user_invite.email)
    else
      @user = nil
    end
  end

  def re_send
    if @user_invite && @user_invite.still_open? && (@user_invite.user_id == current_user.id || current_user.admin?)
      flash[:success] = 'Your invite has been re-sent.'
      @user_invite.send_invite_email
    else
      flash[:error] = 'Your invite was not re-sent.'
    end
    redirect_to user_url(current_user.url_code)
  end

  protected

  def get_variables
    if params[:id].to_i > 0
      @user_invite = current_user.admin? ?
            UserInvite.find(params[:id]) :
            current_user.user_invites.find(params[:id])
    end
    @special_body_class = 'bfm-no-jumbotron'
  end

  def get_invite_using_code
    @user_invite = UserInvite.with_code(params[:code].to_s)
    @countries = Country.all_in_order
  end

  def allowed_params
    params.require(:user_invite).permit(:user_id, :first_name, :email)
  end

end