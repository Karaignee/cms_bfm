class <%= class_name -%> < ActiveRecord::Base

  # Constants

  # relationships
  <%- attributes.each do |attribute| -%>
  <%- if attribute.name[-3..-1] == '_id' -%>
  belongs_to :<%= attribute.name.gsub('_id','') %>
  <%- end -%>
  <%- end -%>

  # validation
  <%- attributes.each do |attribute| -%>
  <%- if attribute.name[-3..-1] == '_id' -%>
  validates :<%= attribute.name %>, presence: true, numericality: {only_integer: true, greater_than: 0}
  <%- else -%>
  #validates :<%= attribute.name %>, presence: true
  <%- end -%>
  <%- end -%>

  # callbacks
  before_destroy :check_dependencies

  # scopes
  scope :all_in_order, -> { order(:<%= attributes.first.name %>) }

  # class methods

  # instance methods
  def destroyable?
    true
  end

  protected

  def check_dependencies
    unless self.destroyable?
      errors.add(:base, "Couldn't be deleted because dependencies exist")
      false
    end
  end

end
