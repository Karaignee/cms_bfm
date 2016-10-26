class UserGroupsController < ApplicationController

  before_action :admin_required
  before_action :set_user_group, only: [:show, :edit, :update, :destroy]

  def index
    @user_groups = UserGroup.all
  end

  def show
  end

  def new
    @user_group = UserGroup.new
  end

  def edit
  end

  def create
    @user_group = UserGroup.new(user_group_params, is_admin: false, is_anonymous: false)
    if @user_group.save
      redirect_to user_groups_url, success: 'User group was successfully created.'
    else
      render :new
    end
  end

  def update
    if @user_group.update(user_group_params)
      redirect_to user_groups_url, success: 'User group was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    if @user_group.destroy
      flash[:success] =  'User group was successfully deleted.'
    else
      flash[:error] =  'User group was not deleted.'
    end
    redirect_to user_groups_url
  end

  private

  def set_user_group
    @user_group = UserGroup.find(params[:id])
  end

  def user_group_params
    params.require(:user_group).permit(:name, :description, :is_contributor, :is_curator, :is_admin,
                                       :limit_user_invites_for_this_group, :invites_limit_per_user)
    # deliberately not allowed ot set :is_admin or :is_anonymous.
  end

end
