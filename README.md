# Bid toy

See it: <http://bidtoy.herokuapp.com>

Playing with [AngularJS](https://angularjs.org). This toy app is for bidding on an auction, since I work for an auction site.

## Development

Uses Sinatra (a Ruby framework).

    bundle
    rackup
    open http://localhost:9292

## Tests

See [issue #2](https://github.com/henrik/bidtoy/issues/2).

#### Unit

Karma is configured with `autoWatch: true`, so if you leave it running, it picks up on changes and re-runs tests automatically.

    # One time
    npm install -g karma-cli

    # To run the suite
    karma start test/unit/karma.conf.js

#### End to end

    # One time
    npm install -g protractor
    webdriver-manager update

    # If they're not started
    webdriver-manager start
    rackup

    # Every time you want to run the suite
    protractor test/e2e/conf.js

Read more: <https://github.com/angular/protractor/blob/master/docs/getting-started.md>
