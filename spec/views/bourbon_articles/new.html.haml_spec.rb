require 'spec_helper'

describe "bourbon_articles/new" do
  before(:each) do
    assign(:bourbon_article, stub_model(BourbonArticle,
      :article_title => "MyString",
      :contributor_id => 1,
      :curator_id => 1,
      :collaborator => 1,
      :article_subtitle => "MyString",
      :image_id => 1,
      :article_body => "MyText",
      :tag => "MyString",
      :visible => false
    ).as_new_record)
  end

  xit "renders new bourbon_article form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", bourbon_articles_path, "post" do
      assert_select "input#bourbon_article_article_title[name=?]", "bourbon_article[article_title]"
      assert_select "input#bourbon_article_contributor_id[name=?]", "bourbon_article[contributor_id]"
      assert_select "input#bourbon_article_curator_id[name=?]", "bourbon_article[curator_id]"
      assert_select "input#bourbon_article_collaborator[name=?]", "bourbon_article[collaborator]"
      assert_select "input#bourbon_article_article_subtitle[name=?]", "bourbon_article[article_subtitle]"
      assert_select "input#bourbon_article_image_id[name=?]", "bourbon_article[image_id]"
      assert_select "textarea#bourbon_article_article_body[name=?]", "bourbon_article[article_body]"
      assert_select "input#bourbon_article_tag[name=?]", "bourbon_article[tag]"
      assert_select "input#bourbon_article_visible[name=?]", "bourbon_article[visible]"
    end
  end
end
