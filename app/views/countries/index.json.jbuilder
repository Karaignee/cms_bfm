json.array!(@countries) do |country|
  json.extract! country, :id, :name, :in_the_eu, :running_order, :iso_code, :country_tld
  json.url country_url(country, format: :json)
end
