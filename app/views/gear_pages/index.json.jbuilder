json.array!(@gear_pages) do |gear_page|
  json.extract! gear_page, :id, :name, :description, :brand_id, :artist_id, :genre_id, :ancestry
  json.url gear_page_url(gear_page, format: :json)
end
