require 'spec_helper'

describe "bourbon_articles/index" do
  before(:each) do
    assign(:bourbon_articles, [
      stub_model(BourbonArticle,
        :article_title => "Article Title",
        :contributor_id => 1,
        :curator_id => 2,
        :collaborator => 3,
        :article_subtitle => "Article Subtitle",
        :image_id => 4,
        :article_body => "MyText",
        :tag => "Tag",
        :visible => false
      ),
      stub_model(BourbonArticle,
        :article_title => "Article Title",
        :contributor_id => 1,
        :curator_id => 2,
        :collaborator => 3,
        :article_subtitle => "Article Subtitle",
        :image_id => 4,
        :article_body => "MyText",
        :tag => "Tag",
        :visible => false
      )
    ])
  end

  xit "renders a list of bourbon_articles" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Article Title".to_s, :count => 2
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => 3.to_s, :count => 2
    assert_select "tr>td", :text => "Article Subtitle".to_s, :count => 2
    assert_select "tr>td", :text => 4.to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => "Tag".to_s, :count => 2
    assert_select "tr>td", :text => false.to_s, :count => 2
  end
end
