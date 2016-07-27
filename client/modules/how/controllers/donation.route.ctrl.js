(function() {
  angular.module('app.how').controller('donationRouteCtrl',
      function($log, exampleService) {
        $log.debug('Initializing donationRouteCtrl');

        var self = this;

        this.newDonor = {};

 /*   this.get('/donors/', function(req, res, next) {
		var donorArr =[];
		mongo.connect(url, function(err, db) {
			assert.equal(null, err);
			var current = db.collection('donorInfos').find();
			current.forEach(function(doc, err) {
				assert.equal(null, err);
				donorArr.push(doc);
			}, function() {
				db.close();
				res.render('index', {items: donorInfos});
			});
		});
	});

 this.addDonor = function() {
	var donor = {
  		firstname: req.body.firstname,
  		lastname: req.body.lastname,
  		email: req.body.email,
  		phone: req.body.phone,
  		donation: req.body.donation,
  		address: req.body.address,
  		city: req.body.city,
  		zip: req.body.zip,
  		state: req.body.state,
  		country: req.body.country,
  		comment: req.body.comment
	};

	db.donorinfos.insertOne(donor, function (err, result) {
		assert.equal(null, err);
		console.log("Donor inserted");
		db.close();
	});
  }; 

 app.post('/donors/', function (req, res) {
  	var donor = new donor({
  		firstname: req.body.firstname,
  		lastname: req.body.lastname,
  		email: req.body.email,
  		phone: req.body.phone,
  		donation: req.body.donation,
  		address: req.body.address,
  		city: req.body.city,
  		zip: req.body.zip,
  		state: req.body.state,
  		country: req.body.country,
  		comment: req.body.comment
  	}).save(function(err, doc) {
  		if (err){
  			res.json(err);
  		} else {
  			res.send("successfully inserted");
  		}
  	});
  });

 /* 	db.donors.insert(donor, function(err) {
  		if (err) {
  			throw err;
  		} else {
  			console.log('saved donor successfully..')
  		}
  	});
  });

  res.redirect('/');

	donorInfo.insert('/donors/', function(req, res, next) {
		var donor = {
	  		firstname: req.body.firstname,
	  		lastname: req.body.lastname,
	  		email: req.body.email,
	  		phone: req.body.phone,
	  		donation: req.body.donation,
	  		address: req.body.address,
	  		city: req.body.city,
	  		zip: req.body.zip,
	  		state: req.body.state,
	  		country: req.body.country,
	  		comment: req.body.comment
  		};
  	});
	
	mongo.connect(url, function(err, db){
		assert.equal(null, err);
		db.collection('donorInfos').insertOne(donor, function(err, result) {
			assert.equal(null, error);
			console.log("Donor inserted");
			db.close();
		});
	}); 
	  	res.redirect('/'); */
	});  
})();
