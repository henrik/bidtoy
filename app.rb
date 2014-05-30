require "sinatra"
require "slim"

Slim::Engine.default_options[:pretty] = true

set :views, -> { root }

get "/" do
  slim :index
end
