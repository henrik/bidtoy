var testApp = angular.module("testApp", [ 'ngAnimate' ]);

var names = [ "Pelle", "Erik" ];
var otherNames = [ "Adam", "David", "Erik", "Jones" ];

testApp.controller("testCtrl", function($scope, $timeout) {
  $scope.persons = names;

  $timeout(function() {
    $scope.persons = otherNames;
  }, 1000);

  $timeout(function() {
    $scope.persons = names;
  }, 3000);

  $timeout(function() {
    $scope.persons = otherNames;
  }, 5000);

  $timeout(function() {
    $scope.persons = names;
  }, 7000);
});
