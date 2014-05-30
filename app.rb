require "sinatra"
require "sinatra/json"
require "slim"

Slim::Engine.default_options[:pretty] = true

set :views, -> { root }

get "/" do
  slim :index
end

get "/bids.json" do
  json [
    { amount: 400, buyer: 1, reserve_met: true, time: "2014-05-01 12:02" },
    { amount: 350, buyer: 2, reserve_met: false, time: "2014-05-01 12:01" },
    { amount: 300, buyer: 1, reserve_met: false, time: "2014-05-01 12:00" },
  ]
end
