class CountriesController < ApplicationController

  before_action :logged_in_required
  before_action :admin_required
  before_action :get_variables

  def index
    @countries = Country.paginate(page: params[:page], per_page: 50).all_in_order
  end

  def show
  end

  def new
    @country = Country.new
  end

  def edit
  end

  def create
    @country = Country.new(allowed_params)
    if @country.save
      flash[:success] = 'Country was successfully created'
      redirect_to countries_url
    else
      render action: :new
    end
  end

  def update
    if @country.update_attributes(allowed_params)
      flash[:success] = 'Country was successfully updated'
      redirect_to countries_url
    else
      render action: :edit
    end
  end

  def destroy
    if @country.destroy
      flash[:success] = 'Country has been deleted.'
    else
      flash[:error] = 'Country could not be deleted.'
    end
    redirect_to countries_url
  end

  protected

  def get_variables
    if params[:id].to_i > 0
      @country = Country.find(params[:id])
    end
  end

  def allowed_params
    params.require(:country).permit(:name, :in_the_eu, :running_order, :iso_code, :country_tld)
  end

end