angular.module("app")
  .controller("MainController", ["$scope", "$rootScope", "$http", "sharedInfo", function($scope, $rootScope, $http, sharedInfo) {

    var countingArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var userInfo = {
      username: "",
      userId: "",
      recentGames: [], // recentGames[0].championId; to get id of champ
      championList: {},
      champName: "",
    };
    var changeData = function() {
      sharedInfo.sharedUsername = $scope.username;
    }
    var gameData;
    var apikey = "2f0eb4e8-34d0-4c4e-bc4f-c591d636a040"
    $scope.firstInit = function(number) {
      if (!$scope.username) $scope.username = sharedInfo.sharedUsername;
      else sharedInfo.sharedUsername = $scope.username;

      console.log(sharedInfo);
      $http.get("https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + $scope.username + "?api_key=" + apikey)
        .then(function(data) {
          console.log("In the getUser factory");
          console.log(data);
          //save username and id into services that are just constants so that they
          //can be accessed throughout the app.
          if (!$scope.username) return false;
          userInfo.username = data.data[$scope.username].name;
          userInfo.userId = data.data[$scope.username].id;
          return true;
        })
        .then(function(data) {
          if (!$scope.username) return false;
          $http.get("https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/" + userInfo.userId + "/recent?api_key=" + apikey)
            .then(function(data) {
              console.log("In the getRecentGames factory");
              console.log(data);
              userInfo.recentGames = data.data.games;
              gameData = data.data.games;
            });
        })
        .then(function(data) {
          if (!$scope.username) return false;
          $http.get("https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=" + apikey)
            .then(function(data) {
              console.log("in the champion list");
              console.log(data.data.data);
              userInfo.championList = data.data.data;
              $.each(userInfo.championList, function(key, value) {
                if (value.id == userInfo.recentGames[number].championId) {
                  console.log(value.id);
                  console.log(value.name);
                  $scope.champName = value.name;
                  userInfo.champName = $scope.champName;
                  $scope.champImg = "http://ddragon.leagueoflegends.com/cdn/5.22.1/img/champion/" + userInfo.champName[0].toUpperCase() + userInfo.champName.slice(1) + ".png";
                  getItems(userInfo.recentGames[number].stats);
                  return false;
                }
              });
            })
        })
        .then(function(data) {
            if (!$scope.username) return false;
            $scope.username = userInfo.username;
            console.log(userInfo.champName);
            console.log("printed here");
            console.log(userInfo);

            $rootScope.$broadcast("username-initialized");
          },
          function(data) {

          });
    };

    $scope.$on("username-initialized", function (event){
      $scope.init($scope.count);
    })
    $scope.init = function(number) {
      console.log("inside of the second init" + " " + number);
      console.log(number);
      if (!number) return false;
      $scope.username = sharedInfo.sharedUsername;

      console.log(sharedInfo);
      $http.get("https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + $scope.username + "?api_key=" + apikey)
        .then(function(data) {
          console.log("In the getUser factory");
          console.log(data);
          console.log($scope.username + " " + sharedInfo.sharedUsername);
          //save username and id into services that are just constants so that they
          //can be accessed throughout the app.
          if (!$scope.username) return false;
          userInfo.username = data.data[$scope.username].name;
          userInfo.userId = data.data[$scope.username].id;
          return true;
        })
        .then(function(data) {
          if (!$scope.username) return false;
          $http.get("https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/" + userInfo.userId + "/recent?api_key=" + apikey)
            .then(function(data) {
              console.log("In the getRecentGames factory");
              console.log(data);
              userInfo.recentGames = data.data.games;
              gameData = data.data.games;
            });
        })
        .then(function(data) {
          if (!$scope.username) return false;
          $http.get("https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=" + apikey)
            .then(function(data) {
              console.log("in the champion list");
              console.log(data.data.data);
              userInfo.championList = data.data.data;
              $.each(userInfo.championList, function(key, value) {
                if (value.id == userInfo.recentGames[number].championId) {
                  console.log(value.id);
                  console.log(value.name);
                  $scope.champName = value.name;
                  userInfo.champName = $scope.champName;
                  $scope.champImg = "http://ddragon.leagueoflegends.com/cdn/5.22.1/img/champion/" + userInfo.champName[0].toUpperCase() + userInfo.champName.slice(1) + ".png";
                  getItems(userInfo.recentGames[number].stats);
                  return false;
                }
              });
            })
        })
        .then(function(data) {
            if (!$scope.username) return false;
            $scope.username = userInfo.username;
            console.log(userInfo.champName);
            console.log("printed here");
            console.log(userInfo);

            console.log(userInfo);
          },
          function(data) {

          });
    };


    var getItems = function(statsObject) {
      var object = [statsObject.item0, statsObject.item1, statsObject.item2, statsObject.item3, statsObject.item4, statsObject.item5, statsObject.item6];
      for (var x = 0; x < object.length; x++) {
        object[x] = "http://ddragon.leagueoflegends.com/cdn/5.22.1/img/item/" + object[x] + ".png";
      }
      $scope.itemsLinks = object;
    }





    // JSONget.then(function (data){
    //   $scope.emails = data.data;
    // });
  }]);
