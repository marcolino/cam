angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller("CameraController", function($scope, Camera, $ionicPopup, $timeout) {
 
  $scope.takePhoto = function() {
    var options = { 
      quality: 75, 
      targetWidth: 300,
      targetHeight: 300,
      /*
      destinationType: Camera.DestinationType.DATA_URL, 
      sourceType: Camera.PictureSourceType.CAMERA, 
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
      */
    };
 
    Camera.getPhoto(options).then(function(imageData) {
      $scope.imgDataLen = imageData;
      $scope.imgURI = /*"data:image/jpeg;base64," + */ imageData;
      $scope.showAlert();
    }, function(err) {
      // An error occured. Show a message to the user
    });
  }
 
/*
})

.controller('PopupCtrl',function($scope, $ionicPopup, $timeout) {
*/
  // Triggered on a button click, or some other target
  $scope.showPopup = function() {
    $scope.data = {};
  
    // An elaborate, custom popup
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
              //don't allow the user to close unless he enters wifi password
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

  // A confirm dialog
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
  
  // An alert dialog
  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Done',
      template: 'Photo taken'
    });
  
    alertPopup.then(function(res) {
      console.log('Thank you for taking photo');
    });
  };

})

;