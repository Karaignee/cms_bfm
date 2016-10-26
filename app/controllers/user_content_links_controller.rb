class UserContentLinksController < ApplicationController

  before_filter :logged_in_required

  def create
    # Create OR update
    @user_content_link = UserContentLink.new(valid_params)
    @user_content_link.user_id = current_user.id
    @user_content_link.preference = UserContentLink.preference_named(params[:commit].to_s)[:id]
    @user_content_link.save #?
            #flash[:success] = 'Updated successfully' :
            #flash[:error]   = 'Could not be updated'
    redirect_to(@user_content_link ? return_to_this : root_url)
  end

  def destroy
    @user_content_link = current_user.user_content_links.where(id: params[:id]).first
    if @user_content_link && @user_content_link.destroyable? && @user_content_link.destroy
      #flash[:success] = 'Updated successfully'
    else
      flash[:error] = 'Could not be updated'
    end
    redirect_to(@user_content_link ? return_to_this : root_url)
  end

  protected

  def return_to_this
    if @user_content_link.profile
      profile_url(@user_content_link.profile.url_code)
    elsif @user_content_link.bourbon_article
      story_url(@user_content_link.bourbon_article.clickable_title)
      #or self.profile_question_answer todo:
    end
  end

  def valid_params
    params.require(:user_content_link).permit(:user_id, :bourbon_article_id, :profile_id,
                                              :profile_question_answer_id, :preference)
    # not permitted: user_id, score
  end
end
