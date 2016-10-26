require 'spec_helper'

describe "PreRegistrations" do
  describe "GET /pre_registrations" do
    it "works! (now write some real specs)" do
      # Run the generator again with the --webrat flag if you want to use webrat methods/matchers
      get pre_registrations_path
      response.status.should be(302)
    end
  end
end
