(function() {
  angular.module('app.how').service('donationService', function($log, $http, $q) {
    $log.debug('Initializing donationService');

    var self = this;

    this.donors = [];

    this.getDonors = function() {
      $log.debug('Entering donationService.getDonors');

      var defer = $q.defer();

    $http.get('/donors').then(
        function(response) {
          $log.debug('getDonors resolve', response);
          self.donors = response.data;
          defer.resolve(response);
        },
        function(error, status) {
          $log.$log('getDonors reject', error, status);
          defer.reject(error, status);
        },
        function(progress) {
          $log.debug('postDonor notify', error, status);
          defer.notify(progress);
        });

      return defer.promise;
    };

    $http.post('/donors', function(req, res, next) {
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
      }
    });
  
 mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('listOfDonors').insertOne(donor, function(err, result) {
        assert.equal(null, error);
        console.log("Donor inserted");
        db.close();
      });
    });
        res.redirect('/');
 /*   }); 

    $http.get('/donors', function(req, res, next) {
      var donorArr =[];
      mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        var current = db.collection('listOfDonors').find();
        current.forEach(function(doc, err) {
          assert.equal(null, err);
          donorArr.push(doc);
        }, function() {
          db.close();
          res.render('index', {items: listOfDonors});
        });
      });
    }); */

    this.getDonors();
  });
})();