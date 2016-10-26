json.array!(@bourbon_articles) do |bourbon_article|
  json.extract! bourbon_article, :id, :article_title, :contributor_id, :curator_id, :collaborator, :article_subtitle, :article_published_at, :image_id, :article_body, :tags, :visible
  json.url bourbon_article_url(bourbon_article, format: :json)
end
