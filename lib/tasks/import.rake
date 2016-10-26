
# For the spreadsheet script we'll run a rake task, you can name the file bourbon_tasks.rb in the lib directory.

# Add the code below. You can see the body of the task action is code parsing the spreadsheet attached, so this give you an example how it works.

# Swap out with bourbon models etc. and when your happy you can run rake bourbon_tasks:load_sample_gear from the command line.



require 'csv'

namespace :bourbon_tasks do

task :load_sample_gear => :environment do
    csv_text = File.read('public/bourbon_test.csv')
    csv = CSV.parse(csv_text, :headers => false) #I tried both true and false and it seems to run either way.

    csv.each do |row|

      g= GearPage.find_by_name(row[0])
      if not g
        g=GearPage.new
      end
        g.name=row[0]
        g.description=row[2]
        g.save!

     
      b= Brand.find_by_name(row[1])
      if not b
      b= Brand.new
      b.name = row[1]
      b.save!
      end

# in the spreadsheet the header is category_main, while the table name is GearCategories
#       m= GearCategories.find_by_name(row[3])
#       if not m
#       m= GearCategories.new
#       m.name = row[3]
#       m.save!
#       end



    end
  end

end


