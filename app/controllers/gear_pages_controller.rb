class GearPagesController < ApplicationController

  AVAILABLE_METHODS = %w(index)

  before_action :logged_in_required, except: [:index, :show]
  before_action :admin_required, except: [:index, :show]
  before_action :get_variables

  def index
    # if current_user
    #   @gear_pages = current_user.gear_pages
    # else
      @gear_pages = GearPage.all_in_order
    # end
  end

  def show
    @gear_pages = GearPage.all_in_order
    @special_body_class = 'bfm-gear-show'
  end

  def new
    @gear_page = GearPage.new
    @gear_categories = GearCategory.all
  end

  def edit
   @gear_categories = GearCategory.all

  end

  def create
    @gear_page = GearPage.new(allowed_params)
    @gear_page.gear_category_id = params[:gear_category_id]
    @gear_page.user_id = current_user.id if current_user
    if @gear_page.save
      flash[:success] = 'GearPage was successfully created'
      redirect_to gear_pages_url
    else
      render action: :new
    end
  end

  def update
    if @gear_page.update_attributes(allowed_params)
      flash[:success] = 'GearPage was successfully updated'
      redirect_to gear_pages_url
    else
      render action: :edit
    end
  end

  def destroy
    if @gear_page.destroy
      flash[:success] = 'GearPage has been deleted.'
    else
      flash[:error] = 'GearPage could not be deleted.'
    end
    redirect_to gear_pages_url
  end

  private

  def get_variables
    if params[:id].to_i > 0
      @gear_page = GearPage.find(params[:id])
    end
    # @countries = Country.all_in_order
  end

  def allowed_params
    params.require(:gear_page).permit(:name, :description, :brand_id, :artist_id, :genre_id, :ancestry, :parent_id, :profile_image)
  end

end