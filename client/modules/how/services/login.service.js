(function() {
  angular.module('app.how').factory('AuthService',
    ['$q', '$timeout', '$http',
    function ($q, $timeout, $http) {

      // create user variable
      var user = null;

      // return available functions for use in the controllers
      return ({
        isLoggedIn: isLoggedIn,
        getUserStatus: getUserStatus,
        login: login,
        logout: logout,
        register: register,
        hello: hello,
        findUser: findUser,
        findUserByUsername:  findUserByUsername,
        updateUser: updateUser
      });

      function isLoggedIn() {
        if(user) {
          return true;
        } else {
          return false;
        }
      }

      function updateUser(userObject) {
        // create a new instance of deferred
        var deferred = $q.defer();
        // send a post request to the server
        $http.post('/user/update',
          {username: userObject.username,
            firstname: userObject.firstname,
            lastname: userObject.lastname,
            email: userObject.email,
            disabilities: userObject.disabilities,
            account: userObject.account,
            mail: userObject.mail})
          // handle success
          .success(function (data, status) {
            if(status === 200 && data.status){
              user = true;
              deferred.resolve();
            } else {
              user = false;
              deferred.reject();
            }
          })
          // handle error
          .error(function (data) {
            user = false;
            deferred.reject();
          });

        // return promise object
        return deferred.promise;
      }

      function hello(userObject) {
        return $http.get('/user/hello').then(function(response) {
          console.log(response.data.id);
          findUser(response.data.id, userObject);
        });
      }

      function findUser(userId, userObject) {
        return $http.get('/user/users').then(function(response) {
          var repData = response.data;
          var currUser = {};

          for(var i = 0; i < repData.length; i++) {
            if(repData[i]._id == userId) {
              currUser = repData[i];
              break;
            }
          }
          console.log(currUser);
          userObject.username = currUser.username;
          userObject.firstname = currUser.firstname;
          userObject.lastname = currUser.lastname;
          userObject.email = currUser.email;
          userObject.disabilities = currUser.disabilities;
          userObject.account = currUser.account;
          userObject.mail = currUser.mail;
        });
      }

      function findUserByUsername(username, userObject) {
        return $http.get('/user/users').then(function(response) {
          var repData = response.data;
          var currUser = {};

          for(var i = 0; i < repData.length; i++) {
            if(repData[i].username == username) {
              currUser = repData[i];
              break;
            }
          }
          console.log(currUser);
          userObject.username = currUser.username;
          userObject.firstname = currUser.firstname;
          userObject.lastname = currUser.lastname;
          userObject.email = currUser.email;
          userObject.disabilities = currUser.disabilities;
          userObject.account = currUser.account;
          userObject.mail = currUser.mail;
        });
      }

      function getUserStatus() {
        return $http.get('/user/status')
        // handle success
        .success(function (data) {
          if(data.status){
            user = true;
          } else {
            user = false;
          }
        })
        // handle error
        .error(function (data) {
          user = false;
        });
      }

      function login(username, password) {

        // create a new instance of deferred
        var deferred = $q.defer();

        // send a post request to the server
        $http.post('/user/login',
          {username: username, password: password})
          // handle success
          .success(function (data, status) {
            if(status === 200 && data.status){
              user = true;
              deferred.resolve();
            } else {
              user = false;
              deferred.reject();
            }
          })
          // handle error
          .error(function (data) {
            user = false;
            deferred.reject();
          });

        // return promise object
        return deferred.promise;

      }

      function logout() {

        // create a new instance of deferred
        var deferred = $q.defer();

        // send a get request to the server
        $http.get('/user/logout')
          // handle success
          .success(function (data) {
            user = false;
            deferred.resolve();
          })
          // handle error
          .error(function (data) {
            user = false;
            deferred.reject();
          });

        // return promise object
        return deferred.promise;

      }


      function register(username, password, email, firstname, lastname, disabilities, account, mail) {
        // create a new instance of deferred
        var deferred = $q.defer();

        // send a post request to the server
        $http.post('/user/register',
          {username: username,
            password: password,
            email:  email,
            firstname: firstname,
            lastname: lastname,
            disabilities: disabilities,
            account: account,
            mail: mail})
          // handle success
          .success(function (data, status) {
            if(status === 200 && data.status){
              deferred.resolve();
            } else {
              deferred.reject();
            }
          })
          // handle error
          .error(function (data) {
            deferred.reject();
          });

        // return promise object
        return deferred.promise;

      }

  }]);
})();
