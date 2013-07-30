def build_css
  `sass src/css/multiline.scss lib/multiline.css -t compressed`
  puts 'css compiled'
end

def build_js
  `cat src/js/*.js | uglifyjs - -c -o lib/script.js`
  puts 'js compiled'
end

task :build do
  build_css
  build_js
end

task watch: [:build] do
  require 'listen'

  %w(js css).each do |type|
    Listen.to("src/#{type}") do |modified, added, removed|
      send("build_#{type}")
    end
  end

  sleep 10 while true
end