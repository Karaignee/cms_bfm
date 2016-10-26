class BrandsController < ApplicationController

  AVAILABLE_METHODS = %w(index)

  before_action :logged_in_required
  before_action :admin_required
  before_action :get_variables

  def index
    @brands = Brand.all_in_order
  end

  def show
  end

  def new
    @brand = Brand.new
  end

  def edit
  end

  def create
    @brand = Brand.new(allowed_params)
    # @brand.user_id = current_user.id if current_user
    if @brand.save
      flash[:success] = 'Brand was successfully created'
      redirect_to brands_url
    else
      render action: :new
    end
  end

  def update
    if @brand.update_attributes(allowed_params)
      flash[:success] = 'Brand was successfully updated'
      redirect_to brands_url
    else
      render action: :edit
    end
  end

  def destroy
    if @brand.destroy
      flash[:success] = 'Brand has been deleted.'
    else
      flash[:error] = 'Brand could not be deleted.'
    end
    redirect_to brands_url
  end

  protected

  def get_variables
    if params[:id].to_i > 0
      @brand = Brand.find(params[:id])
    end
    # @countries = Country.all_in_order
  end

  def allowed_params
    params.require(:brand).permit(:name, :description, :profile_image)
  end

end