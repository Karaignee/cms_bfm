class VideoUploadsController < ApplicationController

  before_action :logged_in_required, except: [:index, :show]
  before_action :contributor_or_curator_required, except: [:index, :show]

  def show
    @video = VideoUpload.find(params[:id])
    @special_body_class = 'video-show'
  end

  def index
    @videos = VideoUpload.order("created_at DESC")
  end

  def new
    @video=VideoUpload.new
  end

  def edit
    @video = VideoUpload.find(params[:id])
  end

  def update
    @video_upload = VideoUpload.find(params[:id])
    if @video_upload.update_attributes(allowed_params)
      flash[:success] = 'Video was successfully updated'
      redirect_to video_uploads_path
    else
      render action: :edit
    end

  end

  def create
    @video_upload = VideoUpload.new(allowed_params)
    if @video_upload.save
      flash[:success] = 'Video was successfully created'
      redirect_to video_uploads_path
    else
      render action: :new
    end
  end

  def destroy
    @video = VideoUpload.find(params[:id])
    @video.destroy
    redirect_to welcome_contributor_url
  end

  protected

  def allowed_params
    params.require(:video_upload).permit(:title, :description, :url, :video_thumbnail)
  end

end
