# == Schema Information
#
# Table name: gear_categories
#
#  id           :integer          not null, primary key
#  name         :string(255)
#  description  :text
#  gear_page_id :integer
#  created_at   :datetime
#  updated_at   :datetime
#

require 'test_helper'

class GearCategoryTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
