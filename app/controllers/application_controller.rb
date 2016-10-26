class ApplicationController < ActionController::Base

  # before_action :set_time_zone

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  Time::DATE_FORMATS[:simple] = '%-e %b %Y'
  Time::DATE_FORMATS[:standard] = '%-e %b %Y %H:%M %Z'

  helper_method :current_user_session, :current_user
  helper_method :admin_required
  # todo: helper_method :create_user_log

  def self.generate_random_code(length_required)
    # call this using - ApplicationController.generate_random_code(20)
    length_required = 5 if length_required.to_i < 5
    answer = ''
    character_list = ('a'..'z').to_a + ('A'..'Z').to_a + ('0'..'9').to_a
    number_of_characters = character_list.size
    length_required.times do
      answer << character_list[rand(number_of_characters)]
    end
    answer
  end

  def delete_facebook_cookie
    fb_cookie = cookies.select {|x| x[0][0..3] == 'fbsr' }.try(:first).try(:first)
    # cookies.delete( fb_cookie ) if fb_cookie
    # cookies[fb_cookie] = nil
  end

  private

  # User management

  def current_user_session
    return @current_user_session if defined?(@current_user_session)
    @current_user_session = UserSession.find
  end

  def current_user
    return @current_user if defined?(@current_user)
    @current_user = current_user_session && current_user_session.record
  end

  def logged_in_required
    unless current_user
      remember_original_url
      flash[:error] = 'You must be signed in to access that page - please sign in'
      redirect_to sign_in_url
      false
    end
  end

  def logged_out_required
    if current_user
      flash[:error] = 'You must be logged out to do that'
      redirect_to root_url
      false
    end
  end

  def admin_required
    unless current_user && current_user.admin?
      flash[:error] = 'You are not permitted to do that'
      redirect_to root_url
    end
  end

  def curator_required
    unless current_user && (current_user.curator? || current_user.admin?)
      flash[:error] = 'You are not permitted to do that'
      redirect_to root_url
    end
  end

  def contributor_required
    unless current_user && (current_user.contributor? || current_user.admin?)
      flash[:error] = 'You are not permitted to do that'
      redirect_to root_url
    end
  end

  def contributor_or_curator_required
    unless current_user && (current_user.contributor? || current_user.curator? || current_user.admin?)
      flash[:error] = 'You are not permitted to do that'
      redirect_to root_url
    end
  end

  def remember_original_url
    session[:return_to] = request.fullpath
  end

  def redirect_back_or_default(default)
    session[:return_to] = nil
    session[:return_to] ? destination = session[:return_to] : destination = default
    redirect_to(destination)
  end

  # General stuff

  def set_time_zone
    Time.zone = current_user.try(:time_zone) || session[:time_zone] || find_time_zone_using_ip || Time.zone
  end

  def find_time_zone_using_ip
    # todo
    # will use geo-location to get a time-zone for the IP address
    if request.ip == '127.0.0.1'
      @location = Hashie::Mash.new(Geocoder.search([53.3478,-6.2597]).first.try(:data))
    else
      loc = Geocoder.search(request.ip) rescue nil
      @location = session[:location] ||= loc ? Hashie::Mash.new(Geocoder.search(request.ip).try(:first).try(:data)) : nil
    end
    if @location
      # country_name = location.data['country_name']
      # country_code = location.data['country_code']
      # lat          = location.data['latitude']
      # lon          = location.data['longitude']
    end
    ## zone = GeoLocateTimeZone
    ## if zone
    ##   session[:time_zone] = zone # saves time on the next request
    ##   return zone
    ## else
    nil
    ## end

    # Dublin: 53.3478° N, 6.2597° W
  end

end
