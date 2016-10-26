# == Schema Information
#
# Table name: bourbon_article_media_uploads
#
#  id                 :integer          not null, primary key
#  bourbon_article_id :integer
#  media_upload_id    :integer
#  user_id            :integer
#  created_at         :datetime
#  updated_at         :datetime
#

require 'spec_helper'

describe BourbonArticleMediaUpload do

  # attr_accessible
  black_list = %w(id created_at updated_at)
  BourbonArticleMediaUpload.column_names.each do |column_name|
    if black_list.include?(column_name)
      it { should_not allow_mass_assignment_of(column_name.to_sym) }
    else
      it { should allow_mass_assignment_of(column_name.to_sym) }
    end
  end

  # relationships
  it { should belong_to(:bourbon_article) }
  it { should belong_to(:media_upload) }
  it { should belong_to(:user) }

  # validation
  it { should validate_presence_of(:bourbon_article_id) }
  it { should validate_numericality_of(:bourbon_article_id) }

  it { should validate_presence_of(:media_upload_id) }
  it { should validate_numericality_of(:media_upload_id) }

  it { should validate_presence_of(:user_id) }
  it { should validate_numericality_of(:user_id) }

  # callbacks
  it { should callback(:check_dependencies).before(:destroy) }

  # scopes
  it { BourbonArticleMediaUpload.should respond_to(:all_in_order) }

  # class methods
  
  # instance methods
  it { should respond_to(:destroyable?) }

end
