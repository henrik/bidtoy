require "sinatra"
require "slim"

set :views, -> { root }

get "/" do
  slim :index
end
