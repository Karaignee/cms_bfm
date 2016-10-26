class UsersController < ApplicationController

  before_action :logged_in_required, except: [:new, :create, :activate]
  before_action :logged_out_required, only: :activate
  before_action :admin_required, except: [:show, :edit, :update, :profile, :change_password, :new, :create, :activate]
  before_action :get_variables

  def index
    @users = User.paginate(page: params[:page], per_page: 50).all_in_order
  end

  def show
  end

  def profile
    # requires params[:url_code] to match @user.url_code
    @bourbon_articles = BourbonArticle.published.all_in_order
    @user = User.with_url_code(params[:url_code])
    @user_content_link = current_user.user_content_links.where(profile_id: @user.id).first
    @special_body_class = 'bfm-profile'
  end

  def new
    if !current_user || (current_user && current_user.admin?)
      @user = User.new
      #country_name = @location[:country_name]
      #@user.country_id = Country.named(country_name).try(:id) if country_name && country_name != 'Reserved'
      @user.country_id = Country.named('Ireland').id # todo
      @user.time_zone = Time.zone.name # todo:
      @user.allow_email_alerts = true
    else
      flash[:error] = 'You are not permitted to do that [U01]'
      redirect_to root_url
    end
    @special_body_class = 'bfm-sign-up'
  end

  def edit
  end

  def create
    if !current_user || (current_user && current_user.admin?)
      @user = User.new(allowed_params)
      @user.active = false
      @user.activation_code = ApplicationController.generate_random_code(20)
      @user.user_group_id = UserGroup.default_group.id
      if @user.save
        if params[:user_invite_activation_code].to_s == ''
          UserMailer.confirm_your_registration(@user).deliver
          flash[:success] = 'Your user ID has been created. Please check your email for further instructions.'
        else
          if UserInvite.activated_by_new_user(@user.id, params[:user_invite_activation_code])
            @user.update_attributes(active: true)
            UserSession.create(@user)
            flash[:success] = 'Your invite has been successfully turned into a full user account. Welcome to Bourbon!'
          else
            flash[:error] = 'Something went wrong with your invite, but your user ID has been created anyway. Please check your email for further instructions'
            Rails.logger.error "Bourbon UsersController#create: UserInvite activated incorrectly: @user = #{@user.inspect}. Invitation Code: #{params[:user_invite_activation_code].to_s}"
          end
        end
        redirect_to root_url
      else
        if params[:user_invite_activation_code].to_s == ''
          render action: 'new'
        else
          flash[:error] = 'Your new profile could not be created for the following reasons: ' + @user.errors.full_messages.to_sentence
          redirect_to user_invite_activate_url(code: params[:user_invite_activation_code])
        end
      end
    else
      flash[:error] = 'You are not permitted to do that [U01]'
      redirect_to root_url
    end
  end

  def update
    # @user has already been conditionally set in 'get_variables'
    if @user.update_attributes(allowed_params)
      flash[:success] = 'User was successfully updated.'
      redirect_to @user
    else
      render action: 'edit'
    end
  end

  def destroy
    if @user.destroy
      flash[:success] = 'User has been successfully deleted'
    else
      flash[:error] = 'User could not be deleted (U-01)'
    end
    redirect_to users_url
  end

  def change_password
    # assumes params {password, password_confirmation, current_password}
    if current_user.change_password(params[:user][:current_password], params[:user][:password], params[:user][:password_confirmation])
      flash[:success] = 'Your password has been successfully changed'
    else
      flash[:error] = 'Your password was not changed'
    end
    redirect_to my_account_url
  end

  def activate
    if params[:code]
      user = User.activate_with_code(params[:code].to_s)
      if user
        UserSession.create(user)
        flash[:success] = 'Your account has been activated!'
      else
        flash[:error] = 'Your activation failed. Try again or contact us for help. [U-02]'
      end
    else
      flash[:error] = 'Activation failed. (U-03)'
    end
    redirect_to root_url
  end

  protected

  def get_variables
    @countries = Country.all_in_order
    @user_groups = UserGroup.all_in_order
    # todo: @countries = Country.all_in_order
    if params[:id].to_i > 0 && current_user && current_user.admin?
      @user = User.find(params[:id])
    elsif current_user
      @user = current_user
    else
      @user = nil
    end
    @special_body_class = 'bfm-no-jumbotron' # might get over-written in individual methods
  end

  def allowed_params
    if current_user && current_user.admin?
      params.require(:user).permit(:active, :country_id, :current_login_at, :current_login_ip,
                                   :failed_login_count, :first_name, :last_login_at,
                                   :last_login_ip, :last_name, :last_request_at, :email,
                                   :login_count, :password, :password_confirmation,
                                   :user_group_id, :time_zone, :tags, :location,
                                   :active)
    else
      params.require(:user).permit(:active, :country_id, :current_login_at, :current_login_ip,
                                   :failed_login_count, :first_name, :last_login_at,
                                   :last_login_ip, :last_name, :last_request_at, :email,
                                   :login_count, :password, :password_confirmation,
                                   :user_group_id, :time_zone, :tags, :location)
    end
  end

end
