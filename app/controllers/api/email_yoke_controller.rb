class Api::EmailYokeController < ApplicationController

  before_action :logged_out_required
  protect_from_forgery except: :create

  def create
    if params[:email] && params[:source]

      x = PreRegistration.new(allowed_params)
      x.ip_address = request.ip
      x.user_agent = request.env['HTTP_USER_AGENT']
      unless x.save
        Rails.logger.warn 'Api::EmailYoke#Create failed to save an email: ' +
                params[:email].to_s +
                ', IP: ' + request.ip +
                ', source: ' + params[:source].to_s +
                '. Reason(s): ' + x.errors.full_messages.to_sentence
      end

    end
    render json: {}, status: 200 # No matter what, they get 200.
  end

  protected

  def allowed_params
    params.permit(:email, :source)
  end

end
