Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports and disable caching.
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = false

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  config.assets.debug = true

  # Adds additional error checking when serving assets at runtime.
  # Checks for improperly declared sprockets dependencies.
  # Raises helpful error messages.
  config.assets.raise_runtime_errors = true

  config.assets.paths << Rails.root.join("app", "assets", "fonts")

  # Raises error for missing translations
  # config.action_view.raise_on_missing_translations = true

  # email setup
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {
          address:              'smtp.gmail.com',
          port:                 587,
          #domain:              'example.com',
          user_name:            ENV['development_test_gmail_address'],
          password:             ENV['development_test_gmail_password'],
          authentication:       'plain',
          enable_starttls_auto: true
  }

  # Paperclip stuff
  Paperclip.options[:command_path] = '/usr/local/bin/'
  # sourced from Heroku DevCenter
  # https://devcenter.heroku.com/articles/paperclip-s3
  config.paperclip_defaults = {
          storage: :s3,
          s3_protocol: 'http', # https for production
          url: ':s3_domain_url',
          path: '/development/:class/:id/:style/:filename',
          s3_host_name: 's3-eu-west-1.amazonaws.com',
          s3_credentials: {
                  bucket: 'bourbonfmstaging',
                  access_key_id: 'AKIAIIGQ3ZWFIXPZUMPA',
                  secret_access_key: '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'
          }
  }

end
