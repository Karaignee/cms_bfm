class GenresController < ApplicationController

  AVAILABLE_METHODS = %w(index)

  before_action :logged_in_required
  before_action :admin_required
  before_action :get_variables

  def index
    @genres = Genre.all_in_order
  end

  def show
  end

  def new
    @genre = Genre.new
  end

  def edit
  end

  def create
    @genre = Genre.new(allowed_params)
    # @genre.user_id = current_user.id if current_user
    if @genre.save
      flash[:success] = 'Genre was successfully created'
      redirect_to genres_url
    else
      render action: :new
    end
  end

  def update
    if @genre.update_attributes(allowed_params)
      flash[:success] = 'Genre was successfully updated'
      redirect_to genres_url
    else
      render action: :edit
    end
  end

  def destroy
    if @genre.destroy
      flash[:success] = 'Genre has been deleted.'
    else
      flash[:error] = 'Genre could not be deleted.'
    end
    redirect_to genres_url
  end

  protected

  def get_variables
    if params[:id].to_i > 0
      @genre = Genre.find(params[:id])
    end
    # @countries = Country.all_in_order
  end

  def allowed_params
    params.require(:genre).permit(:name, :description, :profile_image)
  end

end