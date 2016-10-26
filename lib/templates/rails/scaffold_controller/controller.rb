class <%= table_name.gsub('_',' ').titleize.gsub(' ','') %>Controller < ApplicationController

  AVAILABLE_METHODS = %w(index)

  before_action :logged_in_required
  before_action :admin_required
  before_action :get_variables

  def index
    @<%= table_name %> = <%= class_name %>.all_in_order
  end

  def show
  end

  def new
    @<%= singular_table_name %> = <%= class_name %>.new
  end

  def edit
  end

  def create
    @<%= singular_table_name %> = <%= class_name %>.new(allowed_params)
    @<%= singular_table_name %>.user_id = current_user.id if current_user
    if @<%= singular_table_name %>.save
      flash[:success] = '<%= class_name %> was successfully created'
      redirect_to <%= table_name %>_url
    else
      render action: :new
    end
  end

  def update
    if @<%= singular_table_name %>.update_attributes(allowed_params)
      flash[:success] = '<%= class_name %> was successfully updated'
      redirect_to <%= table_name %>_url
    else
      render action: :edit
    end
  end

  def destroy
    if @<%= singular_table_name %>.destroy
      flash[:success] = '<%= class_name %> has been deleted.'
    else
      flash[:error] = '<%= class_name %> could not be deleted.'
    end
    redirect_to <%= table_name %>_url
  end

  protected

  def get_variables
    if params[:id].to_i > 0
      @<%= singular_table_name %> = <%= class_name %>.find(params[:id])
    end
    # @countries = Country.all_in_order
  end

  def allowed_params
    params.require(:<%= singular_table_name %>).permit(:<%= attributes.map(&:name).join(', :') %>)
  end

end