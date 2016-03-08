angular.module('starter.controllers', [])

.controller('PhotoCtrl', function($scope) {

  $scope.items = [];
$scope.items.push({
  imgSrc: 'http://placehold.it/64x64',
  title: 'titolo foto 1',
  description: 'descrizione foto 1',
  dateOfCreation: new Date(),
  position: 'here...',
});
$scope.items.push({
  imgSrc: 'http://placehold.it/64x64',
  title: 'titolo foto 2',
  description: 'descrizione foto 2',
  dateOfCreation: new Date(),
  position: 'here...',
});
$scope.items.push({
  imgSrc: 'http://placehold.it/64x64',
  title: 'titolo foto 3',
  description: 'descrizione foto 3',
  dateOfCreation: new Date(),
  position: 'here...',
});

  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false; // set to true disables input
  $scope.listCanSwipe = true

  $scope.itemDelete = function(index) {
    $scope.items.splice(index, 1);
  };

  $scope.itemEdit = function(item) {
    console.log('editing item', item);
  };

  $scope.itemReorder = function(item, $fromIndex, $toIndex) {
    console.log('reordering item', item, $fromIndex, $toIndex);
  };
})

.controller("CameraCtrl", function($scope, Camera, $ionicPopup, $timeout) {
 
  // take photo
  $scope.takePhoto = function() {
    var options = { 
      quality: 80, 
      targetWidth: 300,
      targetHeight: 300,
      destinationType: Camera.getProps().DestinationType.FILE_URI, // DATA_URL
      sourceType: Camera.getProps().PictureSourceType.CAMERA,
      encodingType: Camera.getProps().EncodingType.JPEG,
      allowEdit: false,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };
 
    Camera.getPhoto(options).then(function(image) {
      $scope.imgURI = /*"data:image/jpeg;base64," + */ image;
      //$scope.showAlert();
      $scope.showAlert(image);

      $scope.items.push({
        imgSrc: image,
        dateOfCreation: new Date(),
        //title: 'titolo foto',
        //description: 'descrizione foto',
        position: 'there...',
      });

    }, function(err) {
      // An error occured. Show a message to the user
    });
  };
 
  // an alert dialog
  $scope.showAlert = function(text) {
    var alertPopup = $ionicPopup.alert({
      title: 'Attenzione',
      template: text,
    });
  
    alertPopup.then(function(res) {
      console.log('Thank you for taking photo');
    });
  };

})

.controller('VideoCtrl', function($scope, Video) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.videos = Video.all();
  $scope.remove = function(video) {
    Video.remove(video);
  };
})

.controller('VideoDetailCtrl', function($scope, $stateParams, Video) {
  $scope.video = Video.get($stateParams.videoId);
})

.controller('VoiceCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('GeoCtrl', function($scope, $cordovaGeolocation) {

  var posOptions = {
    timeout: 10000,
    enableHighAccuracy: false
  };

  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat = position.coords.latitude
      var lng = position.coords.longitude
      $scope.position = 'Lat:' + lat + ', ' + 'Lng:' + lng;
    }, function(err) {
      // error
      $scope.position = err; // TODO
    })
  ;

  var watchOptions = {
    timeout: 3000,
    enableHighAccuracy: false // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      // error
      $scope.position = err; // TODO
    },
    function(position) {
      var lat = position.coords.latitude
      var lng = position.coords.longitude
      $scope.position = '2Lat:' + lat + ', ' + 'Lng:' + lng;
  });


  watch.clearWatch();
  // OR
  //$cordovaGeolocation.clearWatch(watch)
  //  .then(function(result) {
  //    // success
  //    }, function (error) {
  //    // error
  //  });
})

.controller('PopupCtrl',function($scope, $ionicPopup, $timeout) {
  // triggered on a button click, or some other target
  $scope.showPopup = function() {
    $scope.data = {};
  
    // an elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<input type="password" ng-model="data.wifi">',
      title: 'Enter Wi-Fi Password',
      subTitle: 'Please use normal things',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.wifi) {
              // don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              return $scope.data.wifi;
            }
          }
        }
      ]
    });

    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });

    $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 3000);

  };

  // a confirm dialog
  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Consume Ice Cream',
      template: 'Are you sure you want to eat this ice cream?'
    });
  
    confirmPopup.then(function(res) {
      if (res) {
        console.log('You are sure');
      } else {
        console.log('You are not sure');
      }
    });
  };
})

;