# == Schema Information
#
# Table name: bourbon_articles
#
#  id                   :integer          not null, primary key
#  article_title        :string(255)
#  contributor_id       :integer
#  curator_id           :integer
#  user_id              :integer
#  article_subtitle     :string(255)
#  article_published_at :datetime
#  image_id             :integer
#  article_body         :text
#  tags                 :string(255)
#  visible              :boolean
#  created_at           :datetime
#  updated_at           :datetime
#  clickable_title      :string(255)
#  ready_for_curation   :boolean          default(FALSE)
#

require 'spec_helper'

describe BourbonArticle do

  # attribute-accessible
  black_list = %w(id created_at updated_at clickable_title)
  BourbonArticle.column_names.each do |column_name|
    if black_list.include?(column_name)
      it { should_not allow_mass_assignment_of(column_name.to_sym) }
    else
      it { should allow_mass_assignment_of(column_name.to_sym) }
    end
  end

  # relationships
  it { should belong_to(:contributor) }
  it { should belong_to(:curator) }
  it { should belong_to(:image) }
  xit { should have_many(:uploads) }
  it { should belong_to(:user) }
  it { should have_many(:user_content_links) }

  # validation
  describe 'when an article is ready-for-curation' do
    before do
      subject.ready_for_curation = true
    end

    describe 'should require all fields to be present' do
      it { should validate_presence_of(:article_title) }
      it { should validate_presence_of(:article_subtitle) }
      it { should validate_presence_of(:article_body) }
      it { should validate_presence_of(:article_published_at) }
      it { should validate_presence_of(:image_id) }
      it { should validate_numericality_of(:image_id) }
      it { should validate_presence_of(:tags) }
    end
  end

  it { should validate_uniqueness_of(:article_title) }

  it { should validate_presence_of(:contributor_id) }
  it { should validate_numericality_of(:contributor_id) }

  it { should_not validate_presence_of(:curator_id) }
  it { should validate_numericality_of(:curator_id) }

  it { should validate_presence_of(:user_id) }
  it { should validate_numericality_of(:user_id) }

  # callbacks
  it { should callback(:set_clickable_title).before(:save) }
  it { should callback(:check_dependencies).before(:destroy) }

  # scopes
  it { BourbonArticle.should respond_to(:all_in_order) }
  it { BourbonArticle.should respond_to(:published) }
  it { BourbonArticle.should respond_to(:saved_as_draft) }
  it { BourbonArticle.should respond_to(:sent_for_review) }

  # class methods
  it { BourbonArticle.should respond_to(:search_request) }
  it { BourbonArticle.should respond_to(:tag_search_request) }

  # instance methods
  it { should respond_to(:destroyable?) }
  it { should respond_to(:is_active?) }

end
