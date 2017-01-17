'use strict';

var App = App || {};
var google = google;

// const google = google || {};
//*******TO CHECK******
//IF BOTH APP AND GOOGLE MAP ARE OKAY TO BE OBJECTS - WHAT
//AFFECTS WILL HAPPEN IF SO????

App.init = function () {
  this.apiUrl = 'http://localhost:3000/api';
  this.$main = $('main');
  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
  $('.logout').on('click', this.logout.bind(this));
  $('.home').on('click', this.homepage.bind(this));
  this.$main.on('submit', 'form', this.handleForm);
  if (this.getToken()) {
    this.loggedInState();
  } else {
    this.loggedOutState();
  }
};
App.homepage = function () {
  $('header h1').hide();
  this.$main.html('<p>hello<p>');
};

//Check the zoom on this later. Eventually try UK wide etc.
App.createMap = function () {
  console.log('inside createMap');
  var canvas = document.getElementById('canvas');
  var mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(51.506178, -0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{ 'featureType': 'administrative', 'elementType': 'all', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'administrative', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#444444' }] }, { 'featureType': 'landscape', 'elementType': 'all', 'stylers': [{ 'visibility': 'simplified' }, { 'saturation': '-100' }] }, { 'featureType': 'landscape', 'elementType': 'geometry.fill', 'stylers': [{ 'lightness': 20 }] }, { 'featureType': 'landscape', 'elementType': 'labels.text', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'landscape', 'elementType': 'labels.icon', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'landscape.man_made', 'elementType': 'geometry.fill', 'stylers': [{ 'lightness': '-10' }] }, { 'featureType': 'landscape.natural.landcover', 'elementType': 'all', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'landscape.natural.terrain', 'elementType': 'all', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'poi', 'elementType': 'all', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'road', 'elementType': 'all', 'stylers': [{ 'saturation': -100 }, { 'lightness': 45 }] }, { 'featureType': 'road', 'elementType': 'geometry.stroke', 'stylers': [{ 'lightness': '-20' }] }, { 'featureType': 'road', 'elementType': 'labels.text', 'stylers': [{ 'lightness': '-65' }, { 'gamma': '1' }, { 'weight': '1' }] }, { 'featureType': 'road.highway', 'elementType': 'all', 'stylers': [{ 'visibility': 'simplified' }] }, { 'featureType': 'road.highway', 'elementType': 'geometry.fill', 'stylers': [{ 'lightness': '100' }, { 'visibility': 'on' }] }, { 'featureType': 'road.highway', 'elementType': 'geometry.stroke', 'stylers': [{ 'lightness': '46' }, { 'visibility': 'on' }] }, { 'featureType': 'road.highway', 'elementType': 'labels.text', 'stylers': [{ 'visibility': 'simplified' }, { 'lightness': '46' }] }, { 'featureType': 'road.highway', 'elementType': 'labels.text.fill', 'stylers': [{ 'gamma': '1' }, { 'lightness': '6' }] }, { 'featureType': 'road.highway', 'elementType': 'labels.icon', 'stylers': [{ 'visibility': 'off' }, { 'lightness': '61' }] }, { 'featureType': 'road.arterial', 'elementType': 'all', 'stylers': [{ 'visibility': 'on' }] }, { 'featureType': 'road.arterial', 'elementType': 'labels.text.fill', 'stylers': [{ 'visibility': 'on' }, { 'lightness': '38' }] }, { 'featureType': 'road.arterial', 'elementType': 'labels.text.stroke', 'stylers': [{ 'visibility': 'on' }, { 'lightness': '60' }] }, { 'featureType': 'road.arterial', 'elementType': 'labels.icon', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'road.local', 'elementType': 'labels.text', 'stylers': [{ 'lightness': '30' }] }, { 'featureType': 'road.local', 'elementType': 'labels.text.fill', 'stylers': [{ 'visibility': 'on' }, { 'lightness': '30' }] }, { 'featureType': 'road.local', 'elementType': 'labels.text.stroke', 'stylers': [{ 'visibility': 'on' }, { 'lightness': '60' }] }, { 'featureType': 'transit', 'elementType': 'all', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'transit.line', 'elementType': 'all', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'transit.station', 'elementType': 'labels.icon', 'stylers': [{ 'visibility': 'simplified' }, { 'saturation': '-100' }] }, { 'featureType': 'transit.station.airport', 'elementType': 'all', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'transit.station.bus', 'elementType': 'labels.icon', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'transit.station.rail', 'elementType': 'labels.text', 'stylers': [{ 'visibility': 'on' }] }, { 'featureType': 'transit.station.rail', 'elementType': 'labels.icon', 'stylers': [{ 'visibility': 'on' }, { 'saturation': '-100' }, { 'lightness': '0' }, { 'gamma': '0.50' }] }, { 'featureType': 'water', 'elementType': 'all', 'stylers': [{ 'color': '#46bcec' }, { 'visibility': 'on' }] }, { 'featureType': 'water', 'elementType': 'geometry.fill', 'stylers': [{ 'saturation': '-100' }] }, { 'featureType': 'water', 'elementType': 'labels.text', 'stylers': [{ 'lightness': '100' }, { 'weight': '0.38' }] }],
    mapTypeControl: false,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    },
    scaleControl: true,
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP
    }

  };
  App.map = new google.maps.Map(canvas, mapOptions);
  this.getAccidents();
};

//check the loop - how to change when user mines deeper for info.
App.getAccidents = function () {
  var _this = this;

  $.get('https://api.cyclestreets.net/v2/collisions.locations?bbox=-0.5103,51.2868,0.3340,51.6923&casualtiesinclude=cyclist&limit=3&datetime=friendly&jitter=1&zoom=17&key=1a427e08203905dd').done(function (data) {
    var filteredData = data.features.filter(function (accident) {
      return accident.properties.severity === 'serious';
    });
    _this.loopThroughArray(filteredData);
  });
};

// $get('https://api.cyclestreets.net/v2/collisions.locations?bbox=-0.1535583,51.257618,0.270538,51.704906&casualtiesinclude=cyclist&limit=3&datetime=friendly&jitter=1&zoom=17&key=1a427e08203905dd').done (data =>{
//   for (var i = 0; i < data.length; i++) {
//       let Accident ={
//         datetime: data[i].datetime,
//         severity: data[i].severity,
//         Number_of_Vehicles: data[i].Number_of_Vehicles,
//         lat: data[i].lat,
//         lng: data[i].lng
//       };
//   }
// });

// request(data => {
//   const accidents = data.features;
//   accidents  .each((index, accident) => {
//     let accidentHERE = accident.properties;
//     accidentHERE.latitude = parseFloat(accidentHERE.latitude);
//     Accident.save(accident, (err, accident) => {
//
//     })
//   })
// });


// App.loopThroughArray = function(data){
//   console.log(data);
//   console.log(data);
//   // console.log('inside loop through array');
//   $.each(data, (index, feature)=>{
//     App.addMarkerForAccident(feature);
//     // console.log(feature);
//   });
// };

App.loopThroughArray = function (data) {
  console.log(data);
  console.log(data);
  // console.log('inside loop through array');
  App.markers = data.map(function (feature, index) {
    return App.addMarkerForAccident(feature);
    // console.log(feature);
  });

  var mcOptions = { styles: [{
      height: 53,
      url: '/images/m1.png',
      width: 53
    }, {
      height: 56,
      url: '/images/m2.png',
      width: 56
    }, {
      height: 66,
      url: '/images/m3.png',
      width: 66
    }, {
      height: 78,
      url: '/images/m5.png',
      width: 78
    }, {
      height: 90,
      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      width: 90
    }] };

  var markerCluster = new MarkerClusterer(App.map, App.markers, mcOptions);
};

//icon details
App.addMarkerForAccident = function (feature) {
  var latlng = new google.maps.LatLng(parseFloat(feature.properties.latitude), parseFloat(feature.properties.longitude));
  var marker = new google.maps.Marker({
    position: latlng,
    map: App.map
    //add icon styles details later.
  });
  App.addInfoWindowForAccident(feature, marker);
  return marker;
};
//add info window for accident
App.addInfoWindowForAccident = function (feature, marker) {
  var _this2 = this;

  google.maps.event.addListener(marker, 'click', function () {
    if (typeof _this2.infoWindow !== 'undefined') _this2.infoWindow.close();
    // <img src=${ features.image } can be added to div>
    _this2.infoWindow = new google.maps.InfoWindow({
      content: '\n      <div class="info-window">\n      <p><strong>Severity:</strong> ' + feature.properties.severity + '</p>\n      <p><strong>time of day:</strong> ' + feature.properties.datetime + '</p>\n      </div>\n      '
    });
    _this2.infoWindow.open(_this2.map, marker);
  });
};
App.loggedInState = function () {
  console.log('inside app.loggedInState');
  $('.loggedIn').show();
  $('.loggedOut').hide();
  this.$main.html('\n    <div id="canvas"></div>\n    ');
  console.log('this', this);
  this.createMap(); //.call equivalent to invoking
};
App.loggedOutState = function () {
  $('.loggedIn').hide();
  $('.loggedOut').show();
  this.register();
};
App.register = function (e) {
  if (e) e.preventDefault();
  this.$main.html('\n      <h2>Register</h2>\n      <form method="post" action="/register">\n      <div class="form-group">\n      <input class="form-control" type="text" name="user[username]" placeholder="Username">\n      </div>\n      <div class="form-group">\n      <input class="form-control" type="email" name="user[email]" placeholder="Email">\n      </div>\n      <div class="form-group">\n      <input class="form-control" type="password" name="user[password]" placeholder="Password">\n      </div>\n      <div class="form-group">\n      <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">\n      </div>\n      <input class="btn btn-primary" type="submit" value="Register">\n      </form>\n      ');
};
App.login = function (e) {
  e.preventDefault();
  this.$main.html('\n        <h2>Login</h2>\n        <form method="post" action="/login">\n        <div class="form-group">\n        <input class="form-control" type="email" name="email" placeholder="Email">\n        </div>\n        <div class="form-group">\n        <input class="form-control" type="password" name="password" placeholder="Password">\n        </div>\n        <input class="btn btn-primary" type="submit" value="Login">\n        </form>\n        ');
};
App.logout = function (e) {
  e.preventDefault();
  this.removeToken();
  this.loggedOutState();
};
App.homepage = function () {
  console.log('shabba!');
};
App.handleForm = function (e) {
  console.log('submitted');
  e.preventDefault();
  var url = '' + App.apiUrl + $(this).attr('action');
  var method = $(this).attr('method');
  var data = $(this).serialize();
  return App.ajaxRequest(url, method, data, function (data) {
    if (data.token) App.setToken(data.token);
    console.log('app.loggedInState should run');
    App.loggedInState();
  });
};
App.ajaxRequest = function (url, method, data, callback) {
  return $.ajax({
    url: url,
    method: method,
    data: data,
    beforeSend: this.setRequestHeader.bind(this)
  }).done(callback).fail(function (data) {
    console.log(data);
  });
};
App.setRequestHeader = function (xhr) {
  return xhr.setRequestHeader('Authorization', 'Bearer ' + this.getToken());
};
App.setToken = function (token) {
  return window.localStorage.setItem('token', token);
};
App.getToken = function () {
  return window.localStorage.getItem('token');
};
App.removeToken = function () {
  return window.localStorage.clear();
};
$(App.init.bind(App));