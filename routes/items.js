var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('itemsdb', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'itemdb' database");
        db.collection('items', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'items' collection doesn't exist. Creating it with sample data...");
                populateDB();
                addOwners();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving item: ' + id);
    db.collection('items', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            console.log(item);
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    console.log('findAll');
    db.collection('items', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addItem = function(req, res) {
    var item = req.body;
    console.log('Adding item: ' + JSON.stringify(item));
    db.collection('items', function(err, collection) {
        collection.insert(item, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateItem = function(req, res) {
    var id = req.params.id;
    var item = req.body;
    delete item._id;
    console.log('Updating item: ' + id);
    console.log(JSON.stringify(item));
    db.collection('items', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, item, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating item: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(item);
            }
        });
    });
}

exports.deleteItem = function(req, res) {
    var id = req.params.id;
    console.log('Deleting item: ' + id);
    db.collection('items', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}


exports.findByOwner = function(req, res) {
    var owner = req.params.owner;
    console.log('Finding items owned by: ' + owner);
    db.collection('items', function(err, collection) {
        collection.find({ owner: owner }).toArray(function(err, items) {
            res.send(items);
        });
    });
};
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var items = [
      {
        "name": "1/4 Sheet Sander ",
        "brand": "Ridgid",
        "category": "",
        "url": "http://www.amazon.com/Ridgid-R2501-Sheet-Sander/dp/B003XVYYFK%3FSubscriptionId%3DAKIAJHQ3FYV3OODPE4XA%26tag%3Dshawlarsport-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB003XVYYFK",
        "owner": "Shawn",
        "available": "Yes",
        "description": "R2501",
        "picture": "http://ecx.images-amazon.com/images/I/717j-tAqXML._SL1500_.jpg"
      },
      {
        "name": "Nextec 12-volt Cordless Multi-Tool",
        "brand": "Craftsman",
        "category": "",
        "url": "http://www.amazon.com/Craftsman-17438-Lithium-Ion-Cordless-Multi-Tool/dp/B005ZH64VW%3FSubscriptionId%3DAKIAJHQ3FYV3OODPE4XA%26tag%3Dshawlarsport-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB005ZH64VW",
        "owner": "Shawn",
        "available": "Yes",
        "description": "",
        "picture": "http://ecx.images-amazon.com/images/I/31JXBqAYp7L.jpg"
      },
      {
        "name": "Jig Saw",
        "brand": "Ridgid",
        "category": "",
        "url": "http://www.amazon.com/Ridgid-R31211-Variable-Speed-Orbital/dp/B0026SVMOC%3FSubscriptionId%3DAKIAJHQ3FYV3OODPE4XA%26tag%3Dshawlarsport-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB0026SVMOC",
        "owner": "Shawn",
        "available": "Yes",
        "description": "",
        "picture": "http://ecx.images-amazon.com/images/I/41S7uyPB6aL.jpg"
      },
      {
        "name": "Reciprocating Saw - Corded",
        "brand": "DeWalt",
        "category": "",
        "url": "http://www.amazon.com/DEWALT-DW304PK-Amp-Reciprocating-Saw/dp/B0002AJNQ0%3FSubscriptionId%3DAKIAJHQ3FYV3OODPE4XA%26tag%3Dshawlarsport-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB0002AJNQ0",
        "owner": "Shawn",
        "available": "Yes",
        "description": "",
        "picture": "http://ecx.images-amazon.com/images/I/61rFcwgELWL._SL1500_.jpg"
      },
      {
        "name": "Kill A Watt Electricity Usage Monitor",
        "brand": "P3 International",
        "category": "",
        "url": "http://www.amazon.com/P3-International-P4400-Electricity-Monitor/dp/B00009MDBU%3FSubscriptionId%3DAKIAJHQ3FYV3OODPE4XA%26tag%3Dshawlarsport-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00009MDBU",
        "owner": "Shawn",
        "available": "Yes",
        "description": "P4400 ",
        "picture": "http://ecx.images-amazon.com/images/I/61EFKls52BL._SL1500_.jpg"
      },
      {
        "name": "The Lord of the Rings Trilogy",
        "brand": "",
        "category": "Movies & TV",
        "url": "http://www.amazon.com/The-Lord-Rings-Fellowship-Theatrical/dp/B000X9FLKM%3FSubscriptionId%3DAKIAJHQ3FYV3OODPE4XA%26tag%3Dshawlarsport-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB000X9FLKM",
        "owner": "Shawn",
        "available": "Yes",
        "description": "The Motion Picture Trilogy (The Fellowship of the Ring / The Two Towers / The Return of the King Theatrical Editions)\nBluray",
        "picture": "http://ecx.images-amazon.com/images/I/91-K5HaEwgL._SL1500_.jpg"
      },
      {
        "name": "Tangled",
        "brand": "",
        "category": "Movies & TV",
        "url": "http://www.amazon.com/Tangled-Two-Disc-Blu-ray-DVD-Combo/dp/B004G6009U/ref=sr_1_3?s=movies-tv&ie=UTF8&qid=1369720930&sr=1-3&keywords=tangled",
        "owner": "Shawn",
        "available": "Yes",
        "description": "Bluray/DVD",
        "picture": "http://ecx.images-amazon.com/images/I/61teb%2B3S6EL.jpg"
      },
      {
        "name": "WWII in HD",
        "brand": "",
        "category": "Movies & TV",
        "url": "http://www.amazon.com/WWII-HD-Blu-ray-Rob-Lowe/dp/B002RUNMMY%3FSubscriptionId%3DAKIAJHQ3FYV3OODPE4XA%26tag%3Dshawlarsport-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB002RUNMMY",
        "owner": "Shawn",
        "available": "Yes",
        "description": "Bluray",
        "picture": "http://ecx.images-amazon.com/images/I/51Ce1T4AACL.jpg"
      },
      {
        "name": "The Dark Knight",
        "brand": "",
        "category": "Movies & TV",
        "url": "http://www.amazon.com/The-Dark-Knight-Live-Blu-ray/dp/B001GZ6QEC%3FSubscriptionId%3DAKIAJHQ3FYV3OODPE4XA%26tag%3Dshawlarsport-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB001GZ6QEC",
        "owner": "Shawn",
        "available": "Yes",
        "description": "Bluray",
        "picture": "http://ecx.images-amazon.com/images/I/91H4CRCrX3L._SL1500_.jpg"
      },
      {
        "name": "Gas Powered Handheld Leaf Blower",
        "brand": "Hitachi",
        "category": "Tools & Home Improvement",
        "url": "http://www.amazon.com/Hitachi-RB24EAP-Powered-Handheld-Compliant/dp/B003VYC31Q%3FSubscriptionId%3DAKIAJHQ3FYV3OODPE4XA%26tag%3Dshawlarsport-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB003VYC31Q",
        "owner": "Shawn",
        "available": "Yes",
        "description": "",
        "picture": "http://ecx.images-amazon.com/images/I/51wlR2AmkVL._SL1048_.jpg"
      },
      {
        "name": "Star Trek",
        "brand": "",
        "category": "Movies & TV",
        "url": "http://www.amazon.com/Star-Three-Disc-Special-Edition-Blu-ray/dp/B001AVCFK6%3FSubscriptionId%3DAKIAJHQ3FYV3OODPE4XA%26tag%3Dshawlarsport-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB001AVCFK6",
        "owner": "Shawn",
        "available": "Yes",
        "description": "Bluray",
        "picture": "http://ecx.images-amazon.com/images/I/71U5O1qvW4L._SL1270_.jpg"
      },
      {
        "name": "7-1/4-Inch Circular Saw",
        "brand": "DeWalt",
        "category": "Tools & Home Improvement",
        "url": "http://www.amazon.com/DEWALT-DW368K-Heavy-Duty-Lightweight-Circular/dp/B000068870%3FSubscriptionId%3DAKIAJHQ3FYV3OODPE4XA%26tag%3Dshawlarsport-20%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB000068870",
        "owner": "Shawn",
        "available": "Yes",
        "description": "",
        "picture": "http://ecx.images-amazon.com/images/I/717j-tAqXML._SL1500_.jpg"
      },
      {
        "name": "Beauty and the Beast",
        "brand": "Bluray",
        "category": "Movies & TV",
        "url": "http://www.amazon.com/gp/product/B003DZX3US/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B003DZX3US&linkCode=as2&tag=shawlarsport-20",
        "owner": "Shawn",
        "available": "Yes",
        "description": "DVD/Blu-ray",
        "picture": "http://ecx.images-amazon.com/images/I/61-m3x1vyJL.jpg"
      }
    ];
    db.collection('items', function(err, collection) {
        collection.insert(items, {safe:true}, function(err, result) {});
    });
};

var addOwners = function() {
    var owners = [
    {
        name: "Jake"
    },
    {
        name: "Nick"
    },
    {
        name: "Shawn"
    },
    {
        name: "Jeff"
    }];

    db.collection('owners', function(err, collection) {
        collection.insert(owners, {safe:true}, function(err, result) {});
    });
};


