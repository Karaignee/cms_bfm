class GearCategoriesController < ApplicationController

  AVAILABLE_METHODS = %w(index)

  before_action :logged_in_required
  before_action :admin_required
  before_action :get_variables

  def index
    @gear_categories = GearCategory.all_in_order
  end

  def show
  end

  def new
    @gear_category = GearCategory.new
  end

  def edit
  end

  def create
    @gear_category = GearCategory.new(allowed_params)
    # @gear_category.user_id = current_user.id if current_user
    if @gear_category.save
      flash[:success] = 'GearCategory was successfully created'
      redirect_to gear_categories_url
    else
      render action: :new
    end
  end

  def update
    if @gear_category.update_attributes(allowed_params)
      flash[:success] = 'GearCategory was successfully updated'
      redirect_to gear_categories_url
    else
      render action: :edit
    end
  end

  def destroy
    if @gear_category.destroy
      flash[:success] = 'GearCategory has been deleted.'
    else
      flash[:error] = 'GearCategory could not be deleted.'
    end
    redirect_to gear_categories_url
  end

  protected

  def get_variables
    if params[:id].to_i > 0
      @gear_category = GearCategory.find(params[:id])
    end
    # @countries = Country.all_in_order
  end

  def allowed_params
    params.require(:gear_category).permit(:name, :description, :gear_page)
  end

end