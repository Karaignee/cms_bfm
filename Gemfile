source 'https://rubygems.org'

ruby '2.1.2'
gem 'rails', '4.1.5'

# application-specific gems
gem 'bcrypt'
gem 'scrypt'
gem 'authlogic', '3.4.1'
gem 'omniauth-facebook', '1.4.0' # login with facebook creds
gem 'will_paginate'           # manage long web pages
gem 'will_paginate-bootstrap' # adds Bootstrap3 support to will_paginate
gem 'haml-rails'              # a replacement system for HTML
gem 'hashie'
gem 'geocoder'
gem 'paperclip', '~> 4.1'
gem 'aws-sdk', '~> 1.42.0'
gem 'remotipart'
gem 'intercom-rails', '~> 0.2.24'
gem 'ancestry'
gem 'chosen-rails'

group :development do
  gem 'pry' # railscast 280
  gem 'pry-byebug' # https://github.com/deivid-rodriguez/pry-byebug
end

group :development, :test do
  gem 'sqlite3'
  gem 'dotenv-rails'
end

group :test do
  gem 'rspec-rails', '~> 2.99'
  gem 'shoulda-matchers'
  gem 'shoulda-callback-matchers'
  gem 'factory_girl_rails'
  gem 'guard-rspec'
  gem 'webrat'
end

group :production do
  gem 'pg'
  gem 'rails_serve_static_assets' # needed for Heroku
  gem 'newrelic_rpm'
  gem 'rails_12factor'
end

# Use SCSS for stylesheets
gem 'sass-rails', '~> 4.0.3'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .js.coffee assets and views
gem 'coffee-rails', '~> 4.0.0'
# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer',  platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0',          group: :doc

# Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
gem 'spring',        group: :development


# Use unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Use debugger
# gem 'debugger', group: [:development, :test]
