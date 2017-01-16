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
//Check the zoom on this later. Eventually try UK wide etc.
App.createMap = function () {
  console.log('inside createMap');
  var canvas = document.getElementById('canvas');
  var mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(51.506178, -0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  App.map = new google.maps.Map(canvas, mapOptions);
  this.getAccidents();
};
//check the loop - how to change when user mines deeper for info.
App.getAccidents = function () {
  var _this = this;

  $.get('https://api.cyclestreets.net/v2/collisions.locations?bbox=-0.2259202,51.4911908,0.270538,51.704906&casualtiesinclude=cyclist&limit=3&datetime=friendly&jitter=1&zoom=17&key=1a427e08203905dd').done(function (data) {
    var filteredData = data.features.filter(function (accident) {
      return accident.properties.severity === 'serious' && 'fatal';
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


App.loopThroughArray = function (data) {
  console.log(data);
  console.log(data);
  // console.log('inside loop through array');
  $.each(data, function (index, feature) {
    App.addMarkerForAccident(feature);
    // console.log(feature);
  });
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
};
//add info window for accident
App.addInfoWindowForAccident = function (feature, marker) {
  var _this2 = this;

  google.maps.event.addListener(marker, 'click', function () {
    if (typeof _this2.infoWindow !== 'undefined') _this2.infoWindow.close();
    // <img src=${ features.image } can be added to div>
    _this2.infoWindow = new google.maps.InfoWindow({
      content: '\n      <div class="info-window">\n      <p><strong>Severity:</strong> ' + feature.properties.severity + '</p>\n      </div>\n      '
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
  this.createMap.call(this); //.call equivalent to invoking
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