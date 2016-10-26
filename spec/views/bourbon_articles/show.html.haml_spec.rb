require 'spec_helper'

describe "bourbon_articles/show" do
  before(:each) do
    @bourbon_article = assign(:bourbon_article, stub_model(BourbonArticle,
      :article_title => "Article Title",
      :contributor_id => 1,
      :curator_id => 2,
      :collaborator => 3,
      :article_subtitle => "Article Subtitle",
      :image_id => 4,
      :article_body => "MyText",
      :tag => "Tag",
      :visible => false
    ))
  end

  xit "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Article Title/)
    rendered.should match(/1/)
    rendered.should match(/2/)
    rendered.should match(/3/)
    rendered.should match(/Article Subtitle/)
    rendered.should match(/4/)
    rendered.should match(/MyText/)
    rendered.should match(/Tag/)
    rendered.should match(/false/)
  end
end
