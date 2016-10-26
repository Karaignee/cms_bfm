module ApplicationHelper
  def s3_upload_policy_document
    Base64.encode64(
        "{'expiration': '#{5.minutes.from_now.utc.strftime('%Y-%m-%dT%H:%M:%S.000Z')}',
        'conditions': [
          {'bucket': 'bourbonmedia'},
          {'acl': 'public-read'},
          {'success_action_status': '201'},
          {'x-requested-with': 'xhr'},
          ['starts-with', '$key', 'uploads/'],
          ['starts-with', '$Content-Type', '']
        ]}
      ").gsub(/\n|\r/, '')
  end


  def s3_upload_signature
    Base64.encode64(OpenSSL::HMAC.digest(OpenSSL::Digest::Digest.new('sha1'), 'WpaKosi43Z1OHIjYoSBYMGUEm9ahyOmlCwWA6AKK', s3_upload_policy_document)).gsub(/\n| |\r/, '')
  end
end
