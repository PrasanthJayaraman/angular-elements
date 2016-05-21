app.controller('homeController', ['$scope', function($scope){

  $scope.genderList = [
    {
      "name" : "Male",
     "value" : "male"
    },
    {
     "name" : "Female",
     "value" : "female"
    }
  ]


  $scope.countryList = [
      {
       "name" : "Australia",
       "value" : "australia"
     },
     {
      "name" : "China",
      "value" : "china"
    },
     {
      "name" : "Japan",
      "value" : "japan"
    },
    {
      "name" : "United Kingdom",
      "value" : "uk"
    },
    {
     "name" : "zimbabwe",
     "value" : "zimbabwe"
    }
  ]

  $scope.colorsList = [
    {
      "name" : "Red",
      "value" : "red"
    },
    {
      "name" : "Blue",
      "value" : "blue"
    },
    {
      "name" : "Yellow",
      "value" : "yellow"
    }
  ]


}]);
