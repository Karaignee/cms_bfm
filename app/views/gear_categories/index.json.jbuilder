json.array!(@gear_categories) do |gear_category|
  json.extract! gear_category, :id, :name, :description, :gear_page_id
  json.url gear_category_url(gear_category, format: :json)
end
