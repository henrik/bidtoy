var testApp = angular.module("testApp", []);

var db = {
  1: { id: 1, name: "Pelle", snippet: "Allt om Pelle." },
  2: { id: 2, name: "Erik", snippet: "Erik är en fiskpinne." },
};

testApp.controller("testCtrl", function($scope) {
  console.log("nothing yet", $scope);

  $scope.phones = Object.keys(db).map(function (key) { return db[key]; });

  $scope.viewPhone = function(id) {
    $scope.phone = db[id];
  };
});
