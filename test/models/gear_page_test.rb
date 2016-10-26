# == Schema Information
#
# Table name: gear_pages
#
#  id               :integer          not null, primary key
#  name             :string(255)
#  description      :text
#  brand_id         :integer
#  artist_id        :integer
#  genre_id         :integer
#  ancestry         :string(255)
#  created_at       :datetime
#  updated_at       :datetime
#  gear_category_id :integer
#

require 'test_helper'

class GearPageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
