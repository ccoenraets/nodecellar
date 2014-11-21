Useful links

md C:\mongodb\data 
md c:\data\db

Install windows service 
cd "C:\Program Files\MongoDB 2.6 Standard"

.\bin\mongod.exe --config "C:\mongodb\mongod.cfg" --install

Useful links
http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/
http://docs.mongodb.org/manual/reference/configuration-options/
http://docs.mongodb.org/manual/tutorial/change-user-privileges/
http://stackoverflow.com/questions/4870328/how-to-read-environment-variable-in-node-js
http://stackoverflow.com/questions/10108170/node-js-reuse-mongodb-reference

To setup db user see SetupDb.js

For Azure VM setup endpoint on port 27017

Open the firewall - http://itblog.gr/213/configuring-windows-firewall-from-the-command-line/

netsh advfirewall firewall add rule name="MongoDb" protocol=TCP localport=27017 action=allow dir=IN

