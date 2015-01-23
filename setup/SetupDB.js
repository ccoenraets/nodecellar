
Run .\bin\mongo --port 27017


use wine
db.createUser(
    {
      user: "wineUser",
      pwd: "1XXXXXXX",
      roles: [
         { role: "readWrite", db: "wine" },
      ]
    }
)