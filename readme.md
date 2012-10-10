# Node Cellar Sample Application with Backbone.js, Twitter Bootstrap, Node.js, Express, and MongoDB #

"Node Cellar" is a sample CRUD application built with with Backbone.js, Twitter Bootstrap, Node.js, Express, and MongoDB.

The application allows you to browse through a list of wines, as well as add, update, and delete wines.

This application is further documented [here](http://coenraets.org/blog).

The application is also hosted online. You can test it [here](http://nodecellar.coenraets.org).


## To run the application on your own Heroku account:##

1. Install the [Heroku Toolbelt](http://toolbelt.heroku.com)

2. [Sign up](http://heroku.com/signup) for a Heroku account

3. Login to Heroku from the `heroku` CLI:

        $ heroku login

4. Create a new app on Heroku:

        $ heroku create

5. Add the [MongoLab Heroku Add-on](http://addons.heroku.com/mongolab)

        $ heroku addons:add mongolab

6. Upload the app to Heroku:

        $ git push heroku master

7. Open the app in your browser:

        $ heroku open

