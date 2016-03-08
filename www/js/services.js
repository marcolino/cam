angular.module('starter.services', [])

.factory('Video', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var videos = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return videos;
    },
    remove: function(video) {
      videos.splice(videos.indexOf(video), 1);
    },
    get: function(videoId) {
      for (var i = 0; i < videos.length; i++) {
        if (videos[i].id === parseInt(videoId)) {
          return videos[i];
        }
      }
      return null;
    }
  };
})

.factory('Camera', ['$q', function($q) {
 
  return {
    getProps: function() { return navigator.camera; },

    getPhoto: function(options) {
      var q = $q.defer();
      
      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);
      
      return q.promise;
    },
  }
}])

.factory('Geo', function() {
  var position = '';
  var decimals = 2;
  return {
    setPosition: function(lat, lng) {
      var multiplier = Math.pow(10, decimals);
      position =
        'lat:' + Math.floor(lat * multiplier) / multiplier +
        ', ' +
        'lng:' + Math.floor(lng * multiplier) / multiplier
      ;
    },
    getPosition: function() {
      return position;
    },
    setError: function(err) {
      position = 'Errore nello stabilire la posizione attuale' + err ? ': ' + err : '';
    },
  };
})

;
