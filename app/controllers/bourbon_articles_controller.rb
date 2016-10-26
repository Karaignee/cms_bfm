class BourbonArticlesController < ApplicationController

  before_action :logged_in_required, except: [:index, :show]
  before_action :contributor_or_curator_required, except: [:index, :show]
  before_action :get_variables, except: [:index, :destroy]

  def index
    @bourbon_articles = BourbonArticle.published.order("created_at DESC")
    @special_body_class = 'bfm-stories-landing'
  end

  def show
    @user_content_link = UserContentLink.where(bourbon_article_id: @bourbon_article.try(:id), user_id: current_user.try(:id)).first
    @special_body_class = 'bfm-story'
  end

  def new
    @bourbon_article = BourbonArticle.new(user_id: current_user.id, contributor_id: current_user.id, article_published_at: Time.now)
    @special_body_class = 'bfm-story-form'
  end

  def edit
    @special_body_class = 'bfm-story-form'
    if @bourbon_article.is_active? && current_user && !current_user.admin? && !current_user.curator?
      flash[:error] = 'Only a Curator or Admin can edit publicly-visible articles'
      redirect_to welcome_contributor_url
    end
  end

  def create
    @bourbon_article = BourbonArticle.new(allowed_params)
    @bourbon_article.article_published_at ||= Proc.new { Time.now }.call
    @bourbon_article.user_id ||= current_user.id if current_user
    @bourbon_article.visible = false
    set_ready_for_curation
    @special_body_class = 'bfm-story-form'
    if @bourbon_article.save
      flash[:success] = 'Article was successfully created'
      redirect_to welcome_contributor_url
    else
      render action: :new
    end
  end

  def update

    @special_body_class = 'bfm-story-form'
    set_ready_for_curation
    if @bourbon_article.is_active? && current_user && !current_user.admin? && !current_user.curator?
      flash[:error] = 'Only a Curator or Admin can edit publicly-visible articles'
      redirect_to welcome_contributor_url
    elsif @bourbon_article.update_attributes(allowed_params)
      flash[:success] = 'Article was successfully updated'
      redirect_to story_url(@bourbon_article.id)
    else
      render action: :edit
    end
  end

  def destroy
    @bourbon_article = BourbonArticle.get_by_id_or_clickable_title(params[:article_id])
    if @bourbon_article.delete
      flash[:success] = 'Article has been deleted.'
    else
      flash[:error] = 'Article could not be deleted.'
    end
    redirect_to stories_url
  end


  protected

  def get_variables
    if current_user && (current_user.admin? || current_user.curator?)
      @bourbon_article = BourbonArticle.get_by_id_or_clickable_title(params[:id])
    elsif current_user && current_user.contributor? && current_user.bourbon_articles
      @bourbon_article = current_user.bourbon_articles.get_by_id_or_clickable_title(params[:id])
    end
    @bourbon_article ||= BourbonArticle.published.get_by_id_or_clickable_title(params[:id])
    redirect_if_no_article
    @contributors = User.contributors_or_curators.all_in_order
  end

  def allowed_params
    params.require(:bourbon_article).permit(:article_title, :contributor_id, :curator_id, :article_subtitle, :article_published_at, :image_id, :article_body, :tags, :media_uploads,
                  :visible, :curator_id, :user_id, :ready_for_curation)
  end

  def set_ready_for_curation
    if params[:commit] == 'Save as draft'
      @bourbon_article.ready_for_curation = false
      @bourbon_article.visible = false
    elsif params[:commit] == 'Save and submit for Approval'
      @bourbon_article.ready_for_curation = true
      @bourbon_article.visible = false
    elsif params[:commit] == 'Approve Now'
      @bourbon_article.visible = true
    end
  end

  def redirect_if_no_article
    if @bourbon_article.nil? && params[:id].to_s.length > 0
      flash[:error] = "Sorry, couldn't find that item"
      redirect_to stories_url
      false
    end
  end

end
