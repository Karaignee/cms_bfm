class MediaUploadsController < ApplicationController

  before_action :logged_in_required
  before_action :contributor_or_curator_required
  before_action :get_variables

  def index
    @media_uploads = MediaUpload.all
  end

  def show
  end

  def new
    @media_upload = MediaUpload.new
    @media_upload.publicly_available = true
  end

  def edit
  end

  def create
    @media_upload = MediaUpload.new(valid_params)
    @media_upload.user_id = current_user.id if current_user
    if @media_upload.save
      flash[:success] = 'Item uploaded'
      respond_to do |format|
        format.html { redirect_to media_uploads_url }
        format.json { render json: {id: @media_upload.id, url: @media_upload.upload.url, light_text: @media_upload.make_text_bright}, status: 201 }
      end
    else
      flash[:error] = 'Item was not uploaded'
      respond_to do |format|
        format.html { render :new }
        format.json { render json: {error: @media_upload.errors.full_messages.to_sentence}, status: 501 }
      end
    end
  end

  def update
    if @media_upload.update(valid_params)
      flash[:success] = 'Item updated'
      respond_to do |format|
        format.html { redirect_to media_uploads_path }
        format.json { render json: {id: @media_upload.id, url: @media_upload.upload.url}, status: 201 }
      end
    else
      flash[:error] = 'Item was not updated'
      respond_to do |format|
        format.html { render :edit }
        format.json { render json: {error: @media_upload.errors.full_messages.to_sentence}, status: 501 }
      end
    end
  end

  def destroy
    @media_upload = MediaUpload.find(params[:id])
    if @media_upload && @media_upload.destroy
      flash[:success] = 'Your upload has been deleted'
    else
      flash[:error] = 'Your upload was NOT deleted.'
    end
    redirect_to media_uploads_url
  end

  protected

  def get_variables
    if params[:id]
      if current_user.admin? || current_user.curator?
        @media_upload = MediaUpload.where(id: params[:id]).first
      else
        @media_upload = MediaUpload.available_for(current_user.id).where(id: params[:id]).first
      end
    end
  end

  def valid_params
    params.require(:media_upload).permit(:user_id, :description, :tags, :media_type,
                                         :upload, :upload_file_name, :upload_content_type, :upload_updated_at,
                                         :upload_file_size, :publicly_available, :video_embed_code, :alt_tag,
                                         :make_text_bright)
  end
end
