class WelcomeController < ApplicationController

  #before_filter :re_route, only: :landing
  protect_from_forgery except: :landing
  before_filter :logged_in_required, except: [:landing, :privacy]
  before_filter :contributor_required, only: :contributor
  before_filter :curator_required, only: :curator
  before_filter :admin_required, only: :admin

  def landing
    @bourbon_articles = BourbonArticle.published.order("created_at DESC").limit(14)
    @videos = VideoUpload.order("created_at DESC").limit(9)
    @users = User.all_in_order
    @special_body_class = 'bfm-homepage'
  end

  def normal_user
    @bourbon_articles = BourbonArticle.published.all_in_order
  end

  def contributor
    @bourbon_articles = current_user.admin? ?
        BourbonArticle.all :
        BourbonArticle.where('user_id = :user OR contributor_id = :user', user: current_user.id)
        # current_user.bourbon_articles.all
    @special_body_class = 'bfm-no-jumbotron'
    @videos = VideoUpload.all
    @curated_articles = BourbonArticle.sent_for_review
  end

  def curator
    @bourbon_articles = BourbonArticle.sent_for_review
    @special_body_class = 'bfm-no-jumbotron'
  end

  def admin
    @user_all = User.all.count
    @media_uploads_all = MediaUpload.all.count
    @bourbon_articles_all = BourbonArticle.all.count
    @special_body_class = 'bfm-no-jumbotron'
  end

  def search
    search_models = [User, BourbonArticle]
    @search_results = []
    search_models.each do |a_model|
      @search_results += a_model.search_request(params[:search_for_this])
    end
  end

  def destroy
   if @bourbon_article.destroy
    flash[:success] = 'Article has been deleted.'
  else
    flash[:error] = 'Article could not be deleted.'
  end
  redirect_to stories_url
end


  def tag_search
    tag_search_models = [BourbonArticle]
    @tag_search_results = []
    tag_search_models.each do |a_model|
      @tag_search_results += a_model.tag_search_request(params[:search_for_tag])
    end
    @tag_search_results
  end

  def people
    if params[:tag].to_s.length > 0
      @users = User.tagged_with(params[:tag].to_s)
    else
      @users = User.all
    end
    @special_body_class = 'bfm-no-jumbotron'
  end

  def collections
    @users = User.all
  end

  def privacy
  end

  protected

  def re_route
    unless params[:force] == 'yes'
      if current_user.try(:admin?)
        redirect_to action: :admin
      elsif current_user.try(:curator?)
        redirect_to action: :curator
      elsif current_user.try(:contributor?)
        redirect_to action: :contributor
      elsif current_user
        redirect_to action: :normal_user
      end
      return false
    end
  end

end
