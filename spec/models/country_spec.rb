# == Schema Information
#
# Table name: countries
#
#  id            :integer          not null, primary key
#  name          :string(255)
#  in_the_eu     :boolean
#  running_order :integer
#  iso_code      :string(255)
#  country_tld   :string(255)
#  created_at    :datetime
#  updated_at    :datetime
#

require 'spec_helper'

describe Country do

  # attribute-accessible
  black_list = %w(id created_at updated_at)
  Country.column_names.each do |column_name|
    if black_list.include?(column_name)
      it { should_not allow_mass_assignment_of(column_name.to_sym) }
    else
      it { should allow_mass_assignment_of(column_name.to_sym) }
    end
  end

  # relationships
  it { should have_many(:users) }

  # validation
  it { should validate_presence_of(:country_tld) }

  it { should validate_presence_of(:iso_code) }

  it { should validate_presence_of(:name) }
  it { should validate_uniqueness_of(:name) }

  it { should_not validate_presence_of(:running_order) }
  it { should validate_numericality_of(:running_order) }

  # callbacks
  it { should callback(:check_for_dependents).before(:destroy) }

  # scopes
  it { Country.should respond_to(:all_in_order) }
  it { Country.should respond_to(:eu_only) }

  # class methods
  it { Country.should respond_to(:named) }

  # instance methods
  it { should respond_to(:destroyable?) }

end
