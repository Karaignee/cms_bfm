class ArtistsController < ApplicationController

  AVAILABLE_METHODS = %w(index)

  before_action :logged_in_required
  before_action :admin_required
  before_action :get_variables

  def index
    @artists = Artist.all_in_order
  end

  def show
  end

  def new
    @artist = Artist.new
  end

  def edit
  end

  def create
    @artist = Artist.new(allowed_params)
    # @artist.user_id = current_user.id if current_user
    if @artist.save
      flash[:success] = 'Artist was successfully created'
      redirect_to artists_url
    else
      render action: :new
    end
  end

  def update
    if @artist.update_attributes(allowed_params)
      flash[:success] = 'Artist was successfully updated'
      redirect_to artists_url
    else
      render action: :edit
    end
  end

  def destroy
    if @artist.destroy
      flash[:success] = 'Artist has been deleted.'
    else
      flash[:error] = 'Artist could not be deleted.'
    end
    redirect_to artists_url
  end

  protected

  def get_variables
    if params[:id].to_i > 0
      @artist = Artist.find(params[:id])
    end
    # @countries = Country.all_in_order
  end

  def allowed_params
    params.require(:artist).permit(:name, :description, :profile_image)
  end

end