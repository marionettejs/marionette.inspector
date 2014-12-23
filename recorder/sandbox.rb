require 'sinatra'
require 'pry'

set :port, 9494

get '/lib/*' do
  content_type 'application/javascript'
  File.read(File.join('../extension/js/lib', params['splat']))
end

get '/inspector/*' do
  content_type 'application/javascript'
  File.read(File.join('../extension/js/inspector', params['splat']))
end

get '/common/util/Logger.js' do
  content_type 'application/javascript'
  File.read(File.join('../extension/js/common/util', 'Logger.js'))
end

get '/logger' do
  content_type 'application/javascript'
  File.read(File.join('../extension/js/common/util', 'Logger.js'))
end

get '/*.js' do
  content_type 'application/javascript'
  File.read(File.join('../extension/js', params['splat']))
end

get '/*.css' do
  content_type 'text/css'
  doc = File.read(File.join('..', params['splat'][0]+".css"))
end

get '/templates*' do
  File.read(File.join('../extension/templates', params['splat']))
end

get "/extension/fonts/glyphicons-halflings-regular.ttf" do
  content_type 'application/font-woff'
  File.read(File.join('..', 'extension/fonts/glyphicons-halflings-regular.ttf'))
end

get "/extension/fonts/glyphicons-halflings-regular.woff" do
  content_type 'application/font-woff'
  File.read(File.join('..', 'extension/fonts/glyphicons-halflings-regular.woff'))
end

get "/extension/css/Images/statusbarButtonGlyphs_2x.png" do
  content_type "image/png"
  File.read(File.join('..', 'extension/css/Images/statusbarButtonGlyphs_2x.png'))
end

get "/img/logo.svg" do
  content_type "image/svg+xml"
  File.read(File.join('../extension', 'img/logo.svg'))
end

get '*' do
  File.read('./sandbox.html')
end