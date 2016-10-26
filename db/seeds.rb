# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

unless Rails.env.test?

  puts "\r\n== Test gear content"

  print '-- gear pages -- '
  GearPage.delete_all
  GearPage.where(name: "RICKENBACKER BASS 4003", description: "The Classic Rickenbacker bass - famous for its ringing sustain, treble punch and solid underlying bass. A subtle strip of binding graces the elegantly curved body and the Rosewood fingerboard. Deluxe triangular inlays and stereo capability are standard features.", artist_id: 2, brand_id: 3, gear_category_id: 2).first_or_create
  GearPage.where(name: "Gibson ES-390", description: "The Gibson ES-390 is full gloss with white, untoned bindings, but even so, the dark 'burst finish is beautifully old-school, and while to some Gibson's finish might lack the precision and dipped-in-glass look of more contemporary makers, it's part of the vibe.", artist_id: 1, brand_id: 1, gear_category_id: 2).first_or_create
  GearPage.where(name: "IBANEZ AR-350", description: "This is a really beautiful and collectable guitar. The 80s Ibanez Artists have a great reputation. \r\n\r\n  This is version they only made for a few years featuring a locking trem system. This was one of the top-of-the-line models. The guitars feature tritone switches, floating trems, Abalone inlay fret markers, super 58 pickups, gold coloured hardware. ", artist_id: 3, brand_id: nil, gear_category_id: 2).first_or_create
  GearPage.where(name: "Fender Stratocaster", description: "The Stratocaster is an archetypal instrument—among the world's most popular guitars and an elegantly versatile creation that is both a musical and cultural touchstone. \r\n\r\n  At its heart, though, the Stratocaster remains a fantastic tool—with unmistakable sound and timeless design that have made it the first choice among players worldwide, many of whom have used it to create much of the most important music of our time.", artist_id: 4, brand_id: nil, gear_category_id: 2).first_or_create
  GearPage.where(name: "Gibson Les Paul", description: "The Les Paul Standard remains one of the most sought after guitars in the world 50 years since its first issue. Now, Epiphone's Les Paul Standard brings you the classic features and tone of Les’ invention with legendary Epiphone quality and value. \r\n\r\n  Players like Jimmy Page, Slash, Ace Frehley, Mark Knopfler, Zakk Wylde, Alex Lifeson and countless others rely on the unique tone of a Les Paul. And now, you too can experience the Les Paul Standard at a price that won't break the bank!", artist_id: 4, brand_id: nil, gear_category_id: 2).first_or_create

  Artist.where(name: 'Bob Dylan').first_or_create
  Artist.where(name: 'Bon Jovi').first_or_create
  Artist.where(name: 'Pavarotti').first_or_create
  Artist.where(name: 'Radiohead').first_or_create

  Brand.where(name: 'Gibson').first_or_create
  Brand.where(name: 'Harmony').first_or_create
  Brand.where(name: 'Fender').first_or_create  
  Brand.where(name: 'Hohner').first_or_create
  Brand.where(name: 'Vox').first_or_create
  Brand.where(name: 'Marshall').first_or_create  


  Genre.where(name: 'Folk', description: "Folk music includes both traditional music and the genre that evolved from it during the 20th century folk revival. The term originated in the 19th century but is often applied to music that is older than that. Some types of folk music are also called world music.").first_or_create
  Genre.where(name: 'Alt', description: " Alternative rock (also called alternative music, alt-rock or simply alternative) is a genre of rock music that emerged from the independent music underground of the 1980s and became widely popular by the 1990s.").first_or_create
  Genre.where(name: 'Rock').first_or_create  
  Genre.where(name: 'Blues').first_or_create
  Genre.where(name: 'Electronic').first_or_create
  Genre.where(name: 'Jazz', description: "Jazz is a genre of music that originated in African American communities during the late 19th and early 20th century.").first_or_create

  GearCategory.delete_all
  GearCategory.where(name: 'Electric Guitars').first_or_create
  GearCategory.where(name: 'Acoustic Guitars').first_or_create
  GearCategory.where(name: 'Bass Guitars').first_or_create
  GearCategory.where(name: 'Drum &amp; Percussion').first_or_create
  GearCategory.where(name: 'Amps').first_or_create
  GearCategory.where(name: 'Pro-Audio').first_or_create
  GearCategory.where(name: 'Effects &amp; Pedals').first_or_create
  GearCategory.where(name: 'Keyboards').first_or_create
  GearCategory.where(name: 'Folk Instruments').first_or_create
  GearCategory.where(name: 'Band and Orchestra').first_or_create
  GearCategory.where(name: 'Other').first_or_create
  GearCategory.where(name: 'Accessories').first_or_create
  GearCategory.where(name: 'Parts').first_or_create
  GearCategory.where(name: 'DJ and Lighting Gear').first_or_create

  puts "\r\n== Database seeding"
  print '-- User Groups...'
  UserGroup.where(id: 1).first_or_create!(
          name: 'Standard Users',
          description: "Normal users – can't do much",
          is_admin: false,
          is_contributor: false,
          is_curator: false
  )
  UserGroup.where(id: 2).first_or_create!(
          name: 'Admin Users',
          description: 'System administrators – can do anything',
          is_admin: true,
          is_contributor: true,
          is_curator: true
  )
  UserGroup.where(id: 3).first_or_create!(
          name: 'Contributors',
          description: 'Can contribute content',
          is_admin: false,
          is_contributor: true,
          is_curator: false
  )
  UserGroup.where(id: 4).first_or_create!(
          name: 'Curators',
          description: "Can curate contributors' content, and contribute their own",
          is_admin: false,
          is_contributor: false,
          is_curator: true
  )

  puts ' OK'
  print '-- Users...'

  # Admin users

  User.where(id: 1).first_or_create!(
          email: 'dan.laffan@mac.com',
          first_name: 'Dan',
          last_name: 'Laffan',
          active: true,
          user_group_id: 2,
          country_id: 105,
          password: '123123123',
          password_confirmation: '123123123',
          time_zone: 'Dublin'
  )
  User.where(id: 2).first_or_create!(
          email: 'karen_rooney@hotmail.com',
          first_name: 'Karen',
          last_name: 'Rooney',
          active: true,
          user_group_id: 2,
          country_id: 105,
          password: '123123123',
          password_confirmation: '123123123',
          time_zone: 'Dublin'
  )
  User.where(id: 3).first_or_create!(
          email: 'eoghan.jennings@gmail.com',
          first_name: 'Eoghan',
          last_name: 'Jennings',
          active: true,
          user_group_id: 2,
          country_id: 58,
          password: '123123123',
          password_confirmation: '123123123',
          time_zone: 'Berlin'
  )
  User.first_or_create(
      email: 'kcarrol@tcd.ie',
      first_name: 'Killian',
      last_name: 'Carrol',
      active: true,
      user_group_id: 2,
      country_id: 105,
      password: '123123123',
      password_confirmation: '123123123',
      time_zone: 'Dublin'
  )

  # Other users

  User.where(id: 4).first_or_create!(
          email: 'normal.user@gmail.com',
          first_name: 'Johnny',
          last_name: 'Mooney',
          active: true,
          user_group_id: 1, # normal user
          country_id: 105,
          password: '123123123',
          password_confirmation: '123123123',
          time_zone: 'Dublin'
  )
  User.where(id: 5).first_or_create!(
          email: 'contributor.user@gmail.com',
          first_name: 'Slash',
          last_name: 'Tierney',
          active: true,
          user_group_id: 3, # contributor
          country_id: 105,
          password: '123123123',
          password_confirmation: '123123123',
          time_zone: 'Dublin'
  )
  User.where(id: 6).first_or_create!(
          email: 'curator.user@gmail.com',
          first_name: 'Carmel',
          last_name: "O'Loony",
          active: true,
          user_group_id: 4, # curator
          country_id: 105,
          password: '123123123',
          password_confirmation: '123123123',
          time_zone: 'Dublin'
  )

  puts ' OK'

  print '-- Countries...'
  unless Rails.env.test?

    @countries = [
            {id:   1, iso_code: 'AD', name: 'Andorra', tld: '.ad', in_the_eu: false},
            {id:   2, iso_code: 'AE', name: 'United Arab Emirates', tld: '.ae', in_the_eu: false},
            {id:   3, iso_code: 'AF', name: 'Afghanistan', tld: '.af', in_the_eu: false},
            {id:   4, iso_code: 'AG', name: 'Antigua and Barbuda', tld: '.ag', in_the_eu: false},
            {id:   5, iso_code: 'AI', name: 'Anguilla', tld: '.ai', in_the_eu: false},
            {id:   6, iso_code: 'AL', name: 'Albania', tld: '.al', in_the_eu: false},
            {id:   7, iso_code: 'AM', name: 'Armenia', tld: '.am', in_the_eu: false},
            {id:   8, iso_code: 'AO', name: 'Angola', tld: '.ao', in_the_eu: false},
            {id:   9, iso_code: 'AQ', name: 'Antarctica', tld: '.aq', in_the_eu: false},
            {id:  10, iso_code: 'AR', name: 'Argentina', tld: '.ar', in_the_eu: false},
            {id:  11, iso_code: 'AS', name: 'Samoa', tld: '.as', in_the_eu: false},
            {id:  12, iso_code: 'WS', name: 'Western Samoa', tld: '.ws', in_the_eu: false},
            {id:  13, iso_code: 'AT', name: 'Austria', tld: '.at', in_the_eu: true},
            {id:  14, iso_code: 'AU', name: 'Australia', tld: '.au', in_the_eu: false},
            {id:  15, iso_code: 'AW', name: 'Aruba', tld: '.aw', in_the_eu: false},
            {id:  16, iso_code: 'AX', name: 'Aland Islands', tld: '.ax', in_the_eu: false},
            {id:  17, iso_code: 'AZ', name: 'Azerbaijan', tld: '.az', in_the_eu: false},
            {id:  18, iso_code: 'BA', name: 'Bosnia and Herzegovina', tld: '.ba', in_the_eu: false},
            {id:  19, iso_code: 'BB', name: 'Barbados', tld: '.bb', in_the_eu: false},
            {id:  20, iso_code: 'BD', name: 'Bangladesh', tld: '.bd', in_the_eu: false},
            {id:  21, iso_code: 'BE', name: 'Belgium', tld: '.be', in_the_eu: true},
            {id:  22, iso_code: 'BF', name: 'Burkina Faso', tld: '.bf', in_the_eu: false},
            {id:  23, iso_code: 'BG', name: 'Bulgaria', tld: '.bg', in_the_eu: true},
            {id:  24, iso_code: 'BH', name: 'Bahrain', tld: '.bh', in_the_eu: false},
            {id:  25, iso_code: 'BI', name: 'Burundi', tld: '.bi', in_the_eu: false},
            {id:  26, iso_code: 'BJ', name: 'Benin', tld: '.bj', in_the_eu: false},
            {id:  27, iso_code: 'BL', name: 'Saint Barthelemy', tld: '.bl', in_the_eu: false},
            {id:  28, iso_code: 'BM', name: 'Bermuda', tld: '.bm', in_the_eu: false},
            {id:  29, iso_code: 'BN', name: 'Brunei', tld: '.bn', in_the_eu: false},
            {id:  30, iso_code: 'BO', name: 'Bolivia', tld: '.bo', in_the_eu: false},
            {id:  31, iso_code: 'BQ', name: 'Bonaire, Sint Eustatius and Saba', tld: '.bq', in_the_eu: false},
            {id:  32, iso_code: 'BR', name: 'Brazil', tld: '.br', in_the_eu: false},
            {id:  33, iso_code: 'BS', name: 'Bahamas', tld: '.bs', in_the_eu: false},
            {id:  34, iso_code: 'BT', name: 'Bhutan', tld: '.bt', in_the_eu: false},
            {id:  35, iso_code: 'BV', name: 'Bouvet Island', tld: '.bv', in_the_eu: false},
            {id:  36, iso_code: 'BW', name: 'Botswana', tld: '.bw', in_the_eu: false},
            {id:  37, iso_code: 'BY', name: 'Belarus', tld: '.by', in_the_eu: false},
            {id:  38, iso_code: 'BZ', name: 'Belize', tld: '.bz', in_the_eu: false},
            {id:  39, iso_code: 'CA', name: 'Canada', tld: '.ca', in_the_eu: false},
            {id:  40, iso_code: 'CC', name: 'Cocos (Keeling) Islands', tld: '.cc', in_the_eu: false},
            {id:  41, iso_code: 'CD', name: 'Democratic Republic of Congo', tld: '.cd', in_the_eu: false},
            {id:  42, iso_code: 'CF', name: 'Central African Republic', tld: '.cf', in_the_eu: false},
            {id:  43, iso_code: 'CG', name: 'Republic of Congo', tld: '.cg', in_the_eu: false},
            {id:  44, iso_code: 'CH', name: 'Switzerland', tld: '.ch', in_the_eu: false},
            {id:  45, iso_code: 'CI', name: "Cote d'Ivoire", tld: '.ci', in_the_eu: false},
            {id:  46, iso_code: 'CK', name: 'Cook Islands', tld: '.ck', in_the_eu: false},
            {id:  47, iso_code: 'CL', name: 'Chile', tld: '.cl', in_the_eu: false},
            {id:  48, iso_code: 'CM', name: 'Cameroon', tld: '.cm', in_the_eu: false},
            {id:  49, iso_code: 'CN', name: 'Republic of China', tld: '.cn', in_the_eu: false},
            {id:  50, iso_code: 'CO', name: 'Colombia', tld: '.co', in_the_eu: false},
            {id:  51, iso_code: 'CR', name: 'Costa Rica', tld: '.cr', in_the_eu: false},
            {id:  52, iso_code: 'CU', name: 'Cuba', tld: '.cu', in_the_eu: false},
            {id:  53, iso_code: 'CV', name: 'Cape Verde', tld: '.cv', in_the_eu: false},
            {id:  54, iso_code: 'CW', name: 'Curacao', tld: '.cw', in_the_eu: false},
            {id:  55, iso_code: 'CX', name: 'Christmas Island', tld: '.cx', in_the_eu: false},
            {id:  56, iso_code: 'CY', name: 'Cyprus', tld: '.cy', in_the_eu: true},
            {id:  57, iso_code: 'CZ', name: 'Czech Republic', tld: '.cz', in_the_eu: true},
            {id:  58, iso_code: 'DE', name: 'Germany', tld: '.de', in_the_eu: true},
            {id:  59, iso_code: 'DJ', name: 'Djibouti', tld: '.dj', in_the_eu: false},
            {id:  60, iso_code: 'DK', name: 'Denmark', tld: '.dk', in_the_eu: true},
            {id:  61, iso_code: 'DM', name: 'Dominica', tld: '.dm', in_the_eu: false},
            {id:  62, iso_code: 'DO', name: 'Dominican Republic', tld: '.do', in_the_eu: false},
            {id:  63, iso_code: 'DZ', name: 'Algeria', tld: '.dz', in_the_eu: false},
            {id:  64, iso_code: 'EC', name: 'Ecuador', tld: '.ec', in_the_eu: false},
            {id:  65, iso_code: 'EE', name: 'Estonia', tld: '.ee', in_the_eu: true},
            {id:  66, iso_code: 'EG', name: 'Egypt', tld: '.eg', in_the_eu: false},
            {id:  67, iso_code: 'EH', name: 'Western Sahara', tld: '.eh', in_the_eu: false},
            {id:  68, iso_code: 'ER', name: 'Eritrea', tld: '.er', in_the_eu: false},
            {id:  69, iso_code: 'ES', name: 'Spain', tld: '.es', in_the_eu: true},
            {id:  70, iso_code: 'ET', name: 'Ethiopia', tld: '.et', in_the_eu: false},
            {id:  71, iso_code: 'FI', name: 'Finland', tld: '.fi', in_the_eu: true},
            {id:  72, iso_code: 'FJ', name: 'Fiji', tld: '.fj', in_the_eu: false},
            {id:  73, iso_code: 'FK', name: 'Falkland Islands', tld: '.fk', in_the_eu: false},
            {id:  74, iso_code: 'FM', name: 'Micronesia', tld: '.fm', in_the_eu: false},
            {id:  75, iso_code: 'FO', name: 'Faroe Islands', tld: '.fo', in_the_eu: false},
            {id:  76, iso_code: 'FR', name: 'France', tld: '.fr', in_the_eu: true},
            {id:  77, iso_code: 'GA', name: 'Gabon', tld: '.ga', in_the_eu: false},
            {id:  78, iso_code: 'GB', name: 'UK', tld: '.uk', in_the_eu: true},
            {id:  79, iso_code: 'GD', name: 'Grenada', tld: '.gd', in_the_eu: false},
            {id:  80, iso_code: 'GE', name: 'Georgia', tld: '.ge', in_the_eu: false},
            {id:  81, iso_code: 'GF', name: 'French Guiana', tld: '.gf', in_the_eu: false},
            {id:  82, iso_code: 'GG', name: 'Guernsey', tld: '.gg', in_the_eu: false},
            {id:  83, iso_code: 'GG', name: 'Alderney', tld: '.gg', in_the_eu: false},
            {id:  84, iso_code: 'GG', name: 'Sark', tld: '.gg', in_the_eu: false},
            {id:  85, iso_code: 'GH', name: 'Ghana', tld: '.gh', in_the_eu: false},
            {id:  86, iso_code: 'GI', name: 'Gibraltar', tld: '.gi', in_the_eu: false},
            {id:  87, iso_code: 'GL', name: 'Greenland', tld: '.gl', in_the_eu: false},
            {id:  88, iso_code: 'GM', name: 'Gambia', tld: '.gm', in_the_eu: false},
            {id:  89, iso_code: 'GN', name: 'Guinea', tld: '.gn', in_the_eu: false},
            {id:  90, iso_code: 'GP', name: 'Guadeloupe', tld: '.gp', in_the_eu: false},
            {id:  91, iso_code: 'GQ', name: 'Equatorial Guinea', tld: '.gq', in_the_eu: false},
            {id:  92, iso_code: 'GR', name: 'Greece', tld: '.gr', in_the_eu: true},
            {id:  93, iso_code: 'GS', name: 'South Georgia and the South Sandwich Islands', tld: '.gs', in_the_eu: false},
            {id:  94, iso_code: 'GT', name: 'Guatemala', tld: '.gt', in_the_eu: false},
            {id:  95, iso_code: 'GU', name: 'Guam', tld: '.gu', in_the_eu: false},
            {id:  96, iso_code: 'GW', name: 'Guinea-Bissau', tld: '.gw', in_the_eu: false},
            {id:  97, iso_code: 'GY', name: 'Guyana', tld: '.gy', in_the_eu: false},
            {id:  98, iso_code: 'HK', name: 'Hong Kong', tld: '.hk', in_the_eu: false},
            {id:  99, iso_code: 'HM', name: 'Heard Island and McDonald Islands', tld: '.hm', in_the_eu: false},
            {id: 100, iso_code: 'HN', name: 'Honduras', tld: '.hn', in_the_eu: false},
            {id: 101, iso_code: 'HR', name: 'Croatia', tld: '.hr', in_the_eu: true},
            {id: 102, iso_code: 'HT', name: 'Haiti', tld: '.ht', in_the_eu: false},
            {id: 103, iso_code: 'HU', name: 'Hungary', tld: '.hu', in_the_eu: true},
            {id: 104, iso_code: 'ID', name: 'Indonesia', tld: '.id', in_the_eu: false},
            {id: 105, iso_code: 'IE', name: 'Ireland', tld: '.ie', in_the_eu: true},
            {id: 106, iso_code: 'IL', name: 'Israel', tld: '.il', in_the_eu: false},
            {id: 107, iso_code: 'IM', name: 'Isle of Man', tld: '.im', in_the_eu: false},
            {id: 108, iso_code: 'IN', name: 'India', tld: '.in', in_the_eu: false},
            {id: 109, iso_code: 'IO', name: 'British Indian Ocean Territory', tld: '.io', in_the_eu: false},
            {id: 110, iso_code: 'IQ', name: 'Iraq', tld: '.iq', in_the_eu: false},
            {id: 111, iso_code: 'IR', name: 'Iran', tld: '.ir', in_the_eu: false},
            {id: 112, iso_code: 'IS', name: 'Iceland', tld: '.is', in_the_eu: false},
            {id: 113, iso_code: 'IT', name: 'Italy', tld: '.it', in_the_eu: true},
            {id: 114, iso_code: 'JE', name: 'Jersey', tld: '.je', in_the_eu: false},
            {id: 115, iso_code: 'JM', name: 'Jamaica', tld: '.jm', in_the_eu: false},
            {id: 116, iso_code: 'JO', name: 'Jordan', tld: '.jo', in_the_eu: false},
            {id: 117, iso_code: 'JP', name: 'Japan', tld: '.jp', in_the_eu: false},
            {id: 118, iso_code: 'KE', name: 'Kenya', tld: '.ke', in_the_eu: false},
            {id: 119, iso_code: 'KG', name: 'Kyrgyzstan', tld: '.kg', in_the_eu: false},
            {id: 120, iso_code: 'KH', name: 'Cambodia', tld: '.kh', in_the_eu: false},
            {id: 121, iso_code: 'KI', name: 'Kiribati', tld: '.ki', in_the_eu: false},
            {id: 122, iso_code: 'KM', name: 'Comoros', tld: '.km', in_the_eu: false},
            {id: 123, iso_code: 'KN', name: 'Saint Kitts and Nevis', tld: '.kn', in_the_eu: false},
            {id: 124, iso_code: 'KP', name: 'North Korea', tld: '.kp', in_the_eu: false},
            {id: 125, iso_code: 'KR', name: 'South Korea', tld: '.kr', in_the_eu: false},
            {id: 126, iso_code: 'KW', name: 'Kuwait', tld: '.kw', in_the_eu: false},
            {id: 127, iso_code: 'KY', name: 'Cayman Islands', tld: '.ky', in_the_eu: false},
            {id: 128, iso_code: 'KZ', name: 'Kazakhstan', tld: '.kz', in_the_eu: false},
            {id: 129, iso_code: 'LA', name: 'Laos', tld: '.la', in_the_eu: false},
            {id: 130, iso_code: 'LB', name: 'Lebanon', tld: '.lb', in_the_eu: false},
            {id: 131, iso_code: 'LC', name: 'Saint Lucia', tld: '.lc', in_the_eu: false},
            {id: 132, iso_code: 'LI', name: 'Liechtenstein', tld: '.li', in_the_eu: false},
            {id: 133, iso_code: 'LK', name: 'Sri Lanka', tld: '.lk', in_the_eu: false},
            {id: 134, iso_code: 'LR', name: 'Liberia', tld: '.lr', in_the_eu: false},
            {id: 135, iso_code: 'LS', name: 'Lesotho', tld: '.ls', in_the_eu: false},
            {id: 136, iso_code: 'LT', name: 'Lithuania', tld: '.lt', in_the_eu: true},
            {id: 137, iso_code: 'LU', name: 'Luxembourg', tld: '.lu', in_the_eu: true},
            {id: 138, iso_code: 'LV', name: 'Latvia', tld: '.lv', in_the_eu: true},
            {id: 139, iso_code: 'LY', name: 'Libya', tld: '.ly', in_the_eu: false},
            {id: 140, iso_code: 'MA', name: 'Morocco', tld: '.ma', in_the_eu: false},
            {id: 141, iso_code: 'MC', name: 'Monaco', tld: '.mc', in_the_eu: false},
            {id: 142, iso_code: 'MD', name: 'Moldova', tld: '.md', in_the_eu: false},
            {id: 143, iso_code: 'ME', name: 'Montenegro', tld: '.me', in_the_eu: false},
            {id: 144, iso_code: 'MF', name: 'Saint Martin (French part)', tld: '.mf', in_the_eu: false},
            {id: 145, iso_code: 'MG', name: 'Madagascar', tld: '.mg', in_the_eu: false},
            {id: 146, iso_code: 'MH', name: 'Marshall Islands', tld: '.mh', in_the_eu: false},
            {id: 147, iso_code: 'MK', name: 'FYROM', tld: '.mk', in_the_eu: false},
            {id: 148, iso_code: 'ML', name: 'Mali', tld: '.ml', in_the_eu: false},
            {id: 149, iso_code: 'MM', name: 'Myanmar', tld: '.mm', in_the_eu: false},
            {id: 150, iso_code: 'MN', name: 'Mongolia', tld: '.mn', in_the_eu: false},
            {id: 151, iso_code: 'MO', name: 'Macao', tld: '.mo', in_the_eu: false},
            {id: 152, iso_code: 'MP', name: 'Northern Mariana Islands', tld: '.mp', in_the_eu: false},
            {id: 153, iso_code: 'MQ', name: 'Martinique', tld: '.mq', in_the_eu: false},
            {id: 154, iso_code: 'MR', name: 'Mauritania', tld: '.mr', in_the_eu: false},
            {id: 155, iso_code: 'MS', name: 'Montserrat', tld: '.ms', in_the_eu: false},
            {id: 156, iso_code: 'MT', name: 'Malta', tld: '.mt', in_the_eu: true},
            {id: 157, iso_code: 'MU', name: 'Mauritius', tld: '.mu', in_the_eu: false},
            {id: 158, iso_code: 'MV', name: 'Maldives', tld: '.mv', in_the_eu: false},
            {id: 159, iso_code: 'MW', name: 'Malawi', tld: '.mw', in_the_eu: false},
            {id: 160, iso_code: 'MX', name: 'Mexico', tld: '.mx', in_the_eu: false},
            {id: 161, iso_code: 'MY', name: 'Malaysia', tld: '.my', in_the_eu: false},
            {id: 162, iso_code: 'MZ', name: 'Mozambique', tld: '.mz', in_the_eu: false},
            {id: 163, iso_code: 'NA', name: 'Namibia', tld: '.na', in_the_eu: false},
            {id: 164, iso_code: 'NC', name: 'New Caledonia', tld: '.nc', in_the_eu: false},
            {id: 165, iso_code: 'NE', name: 'Niger', tld: '.ne', in_the_eu: false},
            {id: 166, iso_code: 'NF', name: 'Norfolk Island', tld: '.nf', in_the_eu: false},
            {id: 167, iso_code: 'NG', name: 'Nigeria', tld: '.ng', in_the_eu: false},
            {id: 168, iso_code: 'NI', name: 'Nicaragua', tld: '.ni', in_the_eu: false},
            {id: 169, iso_code: 'NL', name: 'Netherlands', tld: '.nl', in_the_eu: true},
            {id: 170, iso_code: 'NO', name: 'Norway', tld: '.no', in_the_eu: false},
            {id: 171, iso_code: 'NP', name: 'Nepal', tld: '.np', in_the_eu: false},
            {id: 172, iso_code: 'NR', name: 'Nauru', tld: '.nr', in_the_eu: false},
            {id: 173, iso_code: 'NU', name: 'Niue', tld: '.nu', in_the_eu: false},
            {id: 174, iso_code: 'NZ', name: 'New Zealand', tld: '.nz', in_the_eu: false},
            {id: 175, iso_code: 'OM', name: 'Oman', tld: '.om', in_the_eu: false},
            {id: 176, iso_code: 'PA', name: 'Panama', tld: '.pa', in_the_eu: false},
            {id: 177, iso_code: 'PE', name: 'Peru', tld: '.pe', in_the_eu: false},
            {id: 178, iso_code: 'PF', name: 'French Polynesia', tld: '.pf', in_the_eu: false},
            {id: 179, iso_code: 'PG', name: 'Papua New Guinea', tld: '.pg', in_the_eu: false},
            {id: 180, iso_code: 'PH', name: 'Philippines', tld: '.ph', in_the_eu: false},
            {id: 181, iso_code: 'PK', name: 'Pakistan', tld: '.pk', in_the_eu: false},
            {id: 182, iso_code: 'PL', name: 'Poland', tld: '.pl', in_the_eu: true},
            {id: 183, iso_code: 'PM', name: 'Saint Pierre and Miquelon', tld: '.pm', in_the_eu: false},
            {id: 184, iso_code: 'PN', name: 'Pitcairn', tld: '.pn', in_the_eu: false},
            {id: 185, iso_code: 'PR', name: 'Puerto Rico', tld: '.pr', in_the_eu: false},
            {id: 186, iso_code: 'PS', name: 'Palestine, State of', tld: '.ps', in_the_eu: false},
            {id: 187, iso_code: 'PT', name: 'Portugal', tld: '.pt', in_the_eu: true},
            {id: 188, iso_code: 'PW', name: 'Palau', tld: '.pw', in_the_eu: false},
            {id: 189, iso_code: 'PY', name: 'Paraguay', tld: '.py', in_the_eu: false},
            {id: 190, iso_code: 'QA', name: 'Qatar', tld: '.qa', in_the_eu: false},
            {id: 191, iso_code: 'RE', name: 'Reunion', tld: '.re', in_the_eu: false},
            {id: 192, iso_code: 'RO', name: 'Romania', tld: '.ro', in_the_eu: true},
            {id: 193, iso_code: 'RS', name: 'Serbia', tld: '.rs', in_the_eu: false},
            {id: 194, iso_code: 'RU', name: 'Russia', tld: '.ru', in_the_eu: false},
            {id: 195, iso_code: 'RW', name: 'Rwanda', tld: '.rw', in_the_eu: false},
            {id: 196, iso_code: 'SA', name: 'Saudi Arabia', tld: '.sa', in_the_eu: false},
            {id: 197, iso_code: 'SB', name: 'Solomon Islands', tld: '.sb', in_the_eu: false},
            {id: 198, iso_code: 'SC', name: 'Seychelles', tld: '.sc', in_the_eu: false},
            {id: 199, iso_code: 'SD', name: 'Sudan', tld: '.sd', in_the_eu: false},
            {id: 200, iso_code: 'SE', name: 'Sweden', tld: '.se', in_the_eu: true},
            {id: 201, iso_code: 'SG', name: 'Singapore', tld: '.sg', in_the_eu: false},
            {id: 202, iso_code: 'SH', name: 'Saint Helena, Ascension and Tristan da Cunha', tld: '.sh', in_the_eu: false},
            {id: 203, iso_code: 'SI', name: 'Slovenia', tld: '.si', in_the_eu: true},
            {id: 204, iso_code: 'SJ', name: 'Svalbard and Jan Mayen', tld: '.sj', in_the_eu: false},
            {id: 205, iso_code: 'SK', name: 'Slovakia', tld: '.sk', in_the_eu: true},
            {id: 206, iso_code: 'SL', name: 'Sierra Leone', tld: '.sl', in_the_eu: false},
            {id: 207, iso_code: 'SM', name: 'San Marino', tld: '.sm', in_the_eu: false},
            {id: 208, iso_code: 'SN', name: 'Senegal', tld: '.sn', in_the_eu: false},
            {id: 209, iso_code: 'SO', name: 'Somalia', tld: '.so', in_the_eu: false},
            {id: 210, iso_code: 'SR', name: 'Suriname', tld: '.sr', in_the_eu: false},
            {id: 211, iso_code: 'SS', name: 'South Sudan', tld: '.ss', in_the_eu: false},
            {id: 212, iso_code: 'ST', name: 'Sao Tome and Principe', tld: '.st', in_the_eu: false},
            {id: 213, iso_code: 'SV', name: 'El Salvador', tld: '.sv', in_the_eu: false},
            {id: 214, iso_code: 'SX', name: 'Sint Maarten (Dutch part)', tld: '.sx', in_the_eu: false},
            {id: 215, iso_code: 'SY', name: 'Syria', tld: '.sy', in_the_eu: false},
            {id: 216, iso_code: 'SZ', name: 'Swaziland', tld: '.sz', in_the_eu: false},
            {id: 217, iso_code: 'TC', name: 'Turks and Caicos Islands', tld: '.tc', in_the_eu: false},
            {id: 218, iso_code: 'TD', name: 'Chad', tld: '.td', in_the_eu: false},
            {id: 219, iso_code: 'TF', name: 'French Southern Territories', tld: '.tf', in_the_eu: false},
            {id: 220, iso_code: 'TG', name: 'Togo', tld: '.tg', in_the_eu: false},
            {id: 221, iso_code: 'TH', name: 'Thailand', tld: '.th', in_the_eu: false},
            {id: 222, iso_code: 'TJ', name: 'Tajikistan', tld: '.tj', in_the_eu: false},
            {id: 223, iso_code: 'TK', name: 'Tokelau', tld: '.tk', in_the_eu: false},
            {id: 224, iso_code: 'TL', name: 'East Timor', tld: '.tl', in_the_eu: false},
            {id: 225, iso_code: 'TM', name: 'Turkmenistan', tld: '.tm', in_the_eu: false},
            {id: 226, iso_code: 'TN', name: 'Tunisia', tld: '.tn', in_the_eu: false},
            {id: 227, iso_code: 'TO', name: 'Tonga', tld: '.to', in_the_eu: false},
            {id: 228, iso_code: 'TR', name: 'Turkey', tld: '.tr', in_the_eu: false},
            {id: 229, iso_code: 'TT', name: 'Trinidad and Tobago', tld: '.tt', in_the_eu: false},
            {id: 230, iso_code: 'TV', name: 'Tuvalu', tld: '.tv', in_the_eu: false},
            {id: 231, iso_code: 'TW', name: 'Taiwan, Province of China', tld: '.tw', in_the_eu: false},
            {id: 232, iso_code: 'TZ', name: 'Tanzania', tld: '.tz', in_the_eu: false},
            {id: 233, iso_code: 'UA', name: 'Ukraine', tld: '.ua', in_the_eu: false},
            {id: 234, iso_code: 'UG', name: 'Uganda', tld: '.ug', in_the_eu: false},
            {id: 235, iso_code: 'UM', name: 'United States Minor Outlying Islands', tld: '.um', in_the_eu: false},
            {id: 236, iso_code: 'US', name: 'United States', tld: '.us', in_the_eu: false},
            {id: 237, iso_code: 'UY', name: 'Uruguay', tld: '.uy', in_the_eu: false},
            {id: 238, iso_code: 'UZ', name: 'Uzbekistan', tld: '.uz', in_the_eu: false},
            {id: 239, iso_code: 'VA', name: 'Vatican City', tld: '.va', in_the_eu: false},
            {id: 240, iso_code: 'VC', name: 'Saint Vincent and Grenadines', tld: '.vc', in_the_eu: false},
            {id: 241, iso_code: 'VE', name: 'Venezuela', tld: '.ve', in_the_eu: false},
            {id: 242, iso_code: 'VG', name: 'Virgin Islands, British', tld: '.vg', in_the_eu: false},
            {id: 243, iso_code: 'VI', name: 'Virgin Islands, U.S.', tld: '.vi', in_the_eu: false},
            {id: 244, iso_code: 'VN', name: 'Vietnam', tld: '.vn', in_the_eu: false},
            {id: 245, iso_code: 'VU', name: 'Vanuatu', tld: '.vu', in_the_eu: false},
            {id: 246, iso_code: 'WF', name: 'Wallis and Futuna', tld: '.wf', in_the_eu: false},
            {id: 247, iso_code: 'YE', name: 'Yemen', tld: '.ye', in_the_eu: false},
            {id: 248, iso_code: 'YT', name: 'Mayotte', tld: '.yt', in_the_eu: false},
            {id: 249, iso_code: 'ZA', name: 'South Africa', tld: '.za', in_the_eu: false},
            {id: 250, iso_code: 'ZM', name: 'Zambia', tld: '.zm', in_the_eu: false},
            {id: 251, iso_code: 'ZW', name: 'Zimbabwe', tld: '.zw', in_the_eu: false},
            {id: 252, iso_code: 'XK', name: 'Kosovo', tld: '---'}
    ]

    unless Rails.env.test?
      counter = 1000
      @countries.each do |c|
        print '.'
        Country.where(id: c[:id]).first_or_create!(name: c[:name],
                        in_the_eu: c[:in_the_eu] ? true : false,
                        iso_code: c[:iso_code],
                        country_tld: c[:tld],
                        running_order: counter
        )
        counter += 100
      end
    end
    ie = Country.find_by_iso_code('IE')
    ie.running_order = 100
    ie.save
    uk = Country.find_by_iso_code('GB')
    uk.running_order = 200
    uk.save
    uk = Country.find_by_iso_code('US')
    uk.running_order = 300
    uk.save
  end
  puts ' OK'

  print '-- bourbon article... '
  BourbonArticle.where(id: 1).first_or_create(article_title: "READY TO CONTRIBUTE?", contributor_id: 3, curator_id: nil, user_id: 2, article_subtitle: "Bring your thoughts on making music", article_published_at: "2014-05-22 21:11:00", image_id: nil, article_body: "At Bourbon, we hope to change the way discuss your craft online with other musicians. Here are some ways that Bourbon is different: 
    A deliberately simple platform
    We get out of the way and let you focus on your thoughts. There is nothing to set up or customize. Click the green New Story button and start contributing. Highlight any text in your draft to display the formatting bar. Upload photos.....
    Collaborative tools
    We all want to sound like the smartest version of ourselves, and we all want to read better writing online. To help make that happen, Bourbon offers a way to get feedback from friends on your drafts: Use the Share Draft button to solicit notes before you publish.
    If you’re looking for more feedback, post to our Feedback Wanted collection. If you’re an editor at heart, pay it forward by leaving notes for other musicians.
    A wide network
    Blogs require building up your own audience and maintaining a posting schedule to keep those readers. When you post to Bourbon—whether it’s original material or material cross-posted from your blog—you’re plugging into an ever-present network of other musicians. Find your niche and your audience. Contribute when you have something to say.
    Plenty of inspiration
    Keen to contribute but looking for inspiration? Our team curates several collections, while all users determine the Bourbon Top 100, a monthly collection of our most-read posts. These collections are a good way to discover other musicians.
    We believe that sharing ideas moves us all forward as musicians We share some of our favorite stories on Twitter, Facebook, and Google+. Social media moves fast, so you can save stories to your Bourbon reading list for later.
    Questions?
    Take a look at our Bourbon Help Center. For other questions or suggestions, you can reach me at tom@bourbon.fm.", tags: "about bourbon", visible: true)
  BourbonArticle.where(id: 2).first_or_create(article_title: "Lorem Ipsum", contributor_id: 2, curator_id: nil, user_id: 2, article_subtitle: "Section 1.10.32 of \"de Finibus Bonorum et Malorum\"...", article_published_at: "2014-05-24 11:47:00", image_id: nil, article_body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?\r\nSection 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC", tags: "Cicero, Lorem Ipsum", visible: true)
  BourbonArticle.where(id: 3).first_or_create(article_title: "valar morghulis", contributor_id: 2, curator_id: nil, user_id: 2, article_subtitle: "Morbi ac nisl quis metus congue egestas nec mollis...", article_published_at: "2014-05-24 11:50:00", image_id: nil, article_body: "Pellentesque justo enim, malesuada eu massa vel, eleifend laoreet neque. Aliquam enim velit, semper ac facilisis non, fringilla vel elit. Quisque convallis elit eget faucibus feugiat. Duis quis ligula id lectus viverra commodo. Nam ultricies diam mauris, sit amet convallis lectus egestas quis. Morbi quam magna, tempor pretium elementum ut, euismod vitae turpis. In orci nisi, sagittis in diam at, egestas dignissim nulla. Vestibulum faucibus, ipsum faucibus tincidunt adipiscing, odio nisi vestibulum ipsum, eget fringilla sem tortor vitae metus. Aliquam nec felis ac nisi varius porta.\r\n\r\nPhasellus varius lorem mi. Suspendisse suscipit orci a ornare tincidunt. Vivamus nec justo in justo ullamcorper convallis. Curabitur adipiscing mollis egestas. Phasellus porta congue dui, vel pharetra purus consectetur non. Fusce rutrum, leo non lacinia pharetra, lectus enim cursus erat, at vehicula odio neque id turpis. Curabitur imperdiet neque vitae luctus pulvinar. Etiam accumsan hendrerit tincidunt. Nunc luctus consequat nisi, sed tempus nunc elementum vitae. Praesent felis augue, tempor eu tortor tempor, faucibus rhoncus quam. Donec luctus urna erat, ac varius diam faucibus sed. Nullam at quam sed lacus tempor euismod. Nullam nisi lectus, pharetra at cursus quis, gravida ut massa.\r\n\r\nNulla bibendum turpis eget quam pharetra, eu vehicula metus venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ut fringilla mi, sed molestie massa. Morbi vehicula turpis ipsum, ac dictum nisi mollis sit amet. Mauris et est nibh. Pellentesque tristique interdum ipsum vitae luctus. Phasellus a consectetur leo, eu ultrices lacus. Vestibulum ultricies sapien nec quam pulvinar varius. Duis quis congue lorem. Duis nec metus sit amet elit iaculis lacinia ac pulvinar augue. Sed in molestie felis. In hac habitasse platea dictumst. Fusce et facilisis lacus, ac semper nisl. Quisque sed egestas velit, a ullamcorper nibh. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed auctor magna a massa laoreet varius.", tags: "Lorem Ipsum, valar morghulis", visible: true)
  puts 'OK'


  ############# Category 11
  # ProfileQuestion.where(id: 70).first_or_create(
  #         profile_question_category_id: 11,
  #         the_question: "Maybe an ‘advanced’ topic for later. bring in some really good studio musicians.",
  #         running_order: 110010
  #)

  puts 'OK'

  puts "== Seeding DONE\r\n\r\n"
end
