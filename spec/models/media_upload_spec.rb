# == Schema Information
#
# Table name: media_uploads
#
#  id                  :integer          not null, primary key
#  user_id             :integer
#  description         :string(255)
#  tags                :string(255)
#  media_type          :string(255)
#  created_at          :datetime
#  updated_at          :datetime
#  upload_file_name    :string(255)
#  upload_content_type :string(255)
#  upload_file_size    :integer
#  upload_updated_at   :datetime
#  publicly_available  :boolean
#  video_embed_code    :string(255)
#  alt_tag             :string(255)
#  make_text_bright    :boolean          default(FALSE)
#

require 'spec_helper'

describe MediaUpload do

  # attribute-accessible
  black_list = %w(id created_at updated_at)
  MediaUpload.column_names.each do |column_name|
    if black_list.include?(column_name)
      it { should_not allow_mass_assignment_of(column_name.to_sym) }
    else
      it { should allow_mass_assignment_of(column_name.to_sym) }
    end
  end

  # Constants
  it { MediaUpload.const_defined?(:TYPES) }

  # relationships
  it { should belong_to(:user) }
  it { should have_many (:bourbon_article_header_images) }

  # validation
  it { should validate_presence_of(:alt_tag) }

  it { should validate_presence_of(:user_id) }
  it { should validate_numericality_of(:user_id) }

  it { should validate_presence_of(:description) }

  it { should validate_presence_of(:tags) }

  it { should ensure_inclusion_of(:media_type).in_array(MediaUpload::MEDIA_TYPES) }

  it { should validate_presence_of(:upload) }

  context 'if video' do
    before { subject.stub(:media_type) { 'video' } }
    it { should validate_presence_of(:video_embed_code) }
  end

  context 'if not a video' do
    before { subject.stub(:media_type) { 'audio' } }
    it { should_not validate_presence_of(:video_embed_code) }
  end

  # callbacks
  it { should callback(:check_dependencies).before(:destroy) }

  # scopes
  it { MediaUpload.should respond_to(:all_in_order) }
  it { MediaUpload.should respond_to(:just_images) }
  it { MediaUpload.should respond_to(:just_audio) }
  it { MediaUpload.should respond_to(:just_video) }

  # class methods
  it { MediaUpload.should respond_to(:available_for) }

  # instance methods
  it { should respond_to(:destroyable?) }
  it { should respond_to(:text_style) }

  end
