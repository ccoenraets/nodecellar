# Node Cellar Sample Application with Backbone.js, Twitter Bootstrap, Node.js, Express, and MongoDB #

"Node Cellar" is a sample CRUD application built with with Backbone.js, Twitter Bootstrap, Node.js, Express, and MongoDB.

The application allows you to browse through a list of wines, as well as add, update, and delete wines.

This application is further documented [here](http://coenraets.org/blog).

The application is also hosted online. You can test it [here](http://nodecellar.coenraets.org).


## To run the application on your own Azure account:##
1. Setup mongo db to Azure VM - see setup folder for hints
2. In Azure websites create App settings:
	a. MongoDbUserName with username to wine database
	b. MongoDbPassword - password for the user with readWrite access
	c. TODO create variable for the server