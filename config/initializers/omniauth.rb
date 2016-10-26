# OmniAuth.config.logger = Rails.logger
# Rails.application.config.middleware.use OmniAuth::Builder do
#   provider :facebook, '339202539580669', '107761c73dbadbf742091f4d7e352575'
# end

FACEBOOK_SCOPE = 'email,user_friends,publish_stream,user_interests,user_likes,user_hometown'

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['BOURBON_FACEBOOK_APP_ID'], ENV['BOURBON_FACEBOOK_SECRET'],
  provider_ignores_state: true,
  scope: FACEBOOK_SCOPE, display: 'popup'

  OmniAuth.config.on_failure = Proc.new do |env|
    # this will invoke the omniauth_failure action in SessionsController.
    if Rails.env.development?
      Rails.logger.error '=' * 100
      Rails.logger.error env.inspect
      Rails.logger.error '=' * 100
      Rails.logger.error env['omniauth.auth'].inspect
      Rails.logger.error '=' * 100
    end
    'OauthSessionsController'.constantize.action(:omniauth_failure).call(env)
  end

end

  # {
  #   :client_options => {:ssl => {:ca_path => "/etc/ssl/certs"}},
  #   :scope => 'user_about_me,email,publish_actions,user_location,publish_stream,offline_access,user_interests,user_likes,user_hometown',
  #   :display => 'popup'
  # }


# module OmniAuth
#   module Strategies
#     class Facebook < OmniAuth::Strategies::OAuth2
#       # Automatically set the access token coming from the url. Required for
#       # proper PhoneGap support.
#
#       def build_access_token_with_access_token_parameter
#         a_token = request.params['access_token']
#         if a_token
#           ::OAuth2::AccessToken.from_hash(
#                   client, { 'access_token' => a_token }.update(access_token_options))
#         else
#           build_access_token_without_access_token_parameter
#         end
#       end
#
#       alias_method_chain :build_access_token, :access_token_parameter
#     end
#   end
# end