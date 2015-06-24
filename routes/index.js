var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Add helloworld page

router.get('/helloworld', function(req, res, next) {
  res.render('helloworld', { title: 'Hello, World' });
});

/* GET Userlist page */
router.get('/userlist', function(req, res){
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{}, function(e, docs){
		res.render('userlist', {
			"userlist": docs
		});
	});
});

/*GET New user page */
router.get('/newuser/', function(req,res){
	res.render('newuser', {
		title: "newuser"
	});
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    var db = req.db;

    var userName = req.body.username;
    var userEmail = req.body.useremail;

    var collection = db.get('usercollection');

    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.redirect("userlist");
        }
    });
});

router.get('/deluser', function(req, res){
	res.render('deluser', { title: 'delete user'});
});

/* POST to Delete User Service */
router.post('/deluser', function(req, res){
	var db = req.db;
	var username = req.body.username;
	
	var collection = db.get("usercollection");
	collection.remove({"username": username}, function(err,doc){
		if(err){
			res.send("There was a problem deleting the information to the database.");
		}else{
			res.redirect("userlist");
		}
	});
});

module.exports = router;
