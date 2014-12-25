require 'sinatra'
require 'json'
require 'sinatra/cross_origin'

configure do
  enable :cross_origin
end


get '/replay' do ||
  return File.read('./messages.json')
end

post '/record' do ||
  data = params['messages']
  File.open('./messages.json', 'w') do |file|
    file.write(data)
  end
end
