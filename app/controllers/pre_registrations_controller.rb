class PreRegistrationsController < ApplicationController

  before_action :logged_in_required
  before_action :admin_required
  before_action :get_variables

  def index
    @pre_registrations = PreRegistration.page(params[:page]).per_page(100).all_in_order
  end

  def show
  end

  def new
    @pre_registration = PreRegistration.new
  end

  def edit
  end

  def create
    @pre_registration = PreRegistration.new(allowed_params)
    @pre_registration.ip_address = request.ip
    @pre_registration.source = 'admin-input'
    @pre_registration.user_agent = request.env['HTTP_USER_AGENT']
    if @pre_registration.save
      flash[:success] = 'PreRegistration was successfully created'
      redirect_to pre_registrations_url
    else
      render action: :new
    end
  end

  def update
    if @pre_registration.update_attributes(allowed_params)
      flash[:success] = 'PreRegistration was successfully updated'
      redirect_to pre_registrations_url
    else
      render action: :edit
    end
  end

  def destroy
    if @pre_registration.destroy
      flash[:success] = 'PreRegistration has been deleted.'
    else
      flash[:error] = 'PreRegistration could not be deleted.'
    end
    redirect_to pre_registrations_url
  end

  protected

  def get_variables
    if params[:id].to_i > 0
      @pre_registration = PreRegistration.find(params[:id])
    end
    @special_body_class = 'bfm-no-jumbotron'
  end

  def allowed_params
    params.require(:pre_registration).permit(:email, :source, :ip_address)
  end

end