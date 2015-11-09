angular.module("app")
  .value("username", {});

angular.module("app")
  .value("userId", {});




angular.module("app")
  .factory("userInfo", ["username", "userId", "$http", function (username, userId, $http){

  }]);
