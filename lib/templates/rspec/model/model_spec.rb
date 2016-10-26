require 'spec_helper'

<% module_namespacing do -%>
describe <%= class_name %> do

  # Constants
  xit { <%= class_name %>.const_defined?(:CONSTANT_NAME) }

  # relationships
  <%- attributes.each do |attribute| -%>
  <%- if attribute.name[-3..-1] == '_id' -%>
  it { should belong_to(:<%= attribute.name.gsub('_id','') %>) }
  <%- end -%>
  <%- end -%>

  # validation
  <%- attributes.each do |attribute| -%>
  <%- if attribute.name[-3..-1] == '_id' -%>
  it { should validate_presence_of(:<%= attribute.name %>) }
  it { should validate_numericality_of(:<%= attribute.name %>) }

  <%- else -%>
  it { should validate_presence_of(:<%= attribute.name %>) }

  <%- end -%>
  <%- end -%>
  # callbacks
  it { should callback(:check_dependencies).before(:destroy) }

  # scopes
  it { <%= class_name %>.should respond_to(:all_in_order) }

  # class methods
  
  # instance methods
  it { should respond_to(:destroyable?) }
  
  skip "add some examples to (or delete) #{__FILE__}"

end
<% end -%>