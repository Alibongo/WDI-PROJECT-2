'use strict';

var App = App || {};
var google = google;

App.init = function () {
  // this.apiUrl = 'http://localhost:3000/api';
  this.apiUrl = window.location.origin + '/api';
  this.$main = $('main');
  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
  $('.logout').on('click', this.logout.bind(this));
  $('.home').on('click', this.homepage.bind(this));
  $('body').on('submit', 'form', this.handleForm);
  // this.$main.on('submit', 'form', this.handleForm);
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

App.createMap = function () {
  console.log('inside createMap');
  var canvas = document.getElementById('canvas');
  var mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(51.506178, -0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{ 'featureType': 'administrative', 'elementType': 'all', 'stylers': [{ ' visibility': 'off' }] }, { 'featureType': 'administrative', 'elementType': 'labels.text.fill', 'stylers': [{ 'color': '#444444' }] }, { 'featureType': 'landscape', 'elementType': 'all', 'stylers': [{ 'visibility': 'simplified' }, { 'saturation': '-100' }] }, { 'featureType': 'landscape', 'elementType': 'geometry.fill', 'stylers': [{ 'lightness': 20 }] }, { 'featureType': 'landscape', 'elementType': 'labels.text', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'landscape', 'elementType': 'labels.icon', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'landscape.man_made', 'elementType': 'geometry.fill', 'stylers': [{ 'lightness': '-10' }] }, { 'featureType': 'landscape.natural.landcover', 'elementType': 'all', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'landscape.natural.terrain', 'elementType': 'all', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'poi', 'elementType': 'all', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'road', 'elementType': 'all', 'stylers': [{ 'saturation': -100 }, { 'lightness': 45 }] }, { 'featureType': 'road', 'elementType': 'geometry.stroke', 'stylers': [{ 'lightness': '-20' }] }, { 'featureType': 'road', 'elementType': 'labels.text', 'stylers': [{ 'lightness': '-65' }, { 'gamma': '1' }, { 'weight': '1' }] }, { 'featureType': 'road.highway', 'elementType': 'all', 'stylers': [{ 'visibility': 'simplified' }] }, { 'featureType': 'road.highway', 'elementType': 'geometry.fill', 'stylers': [{ 'lightness': '100' }, { 'visibility': 'on' }] }, { 'featureType': 'road.highway', 'elementType': 'geometry.stroke', 'stylers': [{ 'lightness': '46' }, { 'visibility': 'on' }] }, { 'featureType': 'road.highway', 'elementType': 'labels.text', 'stylers': [{ 'visibility': 'simplified' }, { 'lightness': '46' }] }, { 'featureType': 'road.highway', 'elementType': 'labels.text.fill', 'stylers': [{ 'gamma': '1' }, { 'lightness': '6' }] }, { 'featureType': 'road.highway', 'elementType': 'labels.icon', 'stylers': [{ 'visibility': 'off' }, { 'lightness': '61' }] }, { 'featureType': 'road.arterial', 'elementType': 'all', 'stylers': [{ 'visibility': 'on' }] }, { 'featureType': 'road.arterial', 'elementType': 'labels.text.fill', 'stylers': [{ 'visibility': 'on' }, { 'lightness': '38' }] }, { 'featureType': 'road.arterial', 'elementType': 'labels.text.stroke', 'stylers': [{ 'visibility': 'on' }, { 'lightness': '60' }] }, { 'featureType': 'road.arterial', 'elementType': 'labels.icon', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'road.local', 'elementType': 'labels.text', 'stylers': [{ 'lightness': '30' }] }, { 'featureType': 'road.local', 'elementType': 'labels.text.fill', 'stylers': [{ 'visibility': 'on' }, { 'lightness': '30' }] }, { 'featureType': 'road.local', 'elementType': 'labels.text.stroke', 'stylers': [{ 'visibility': 'on' }, { 'lightness': '60' }] }, { 'featureType': 'transit', 'elementType': 'all', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'transit.line', 'elementType': 'all', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'transit.station', 'elementType': 'labels.icon', 'stylers': [{ 'visibility': 'simplified' }, { 'saturation': '-100' }] }, { 'featureType': 'transit.station.airport', 'elementType': 'all', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'transit.station.bus', 'elementType': 'labels.icon', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'transit.station.rail', 'elementType': 'labels.text', 'stylers': [{ 'visibility': 'on' }] }, { 'featureType': 'transit.station.rail', 'elementType': 'labels.icon', 'stylers': [{ 'visibility': 'on' }, { 'saturation': '-100' }, { 'lightness': '0' }, { 'gamma': '0.50' }] }, { 'featureType': 'water', 'elementType': 'all', 'stylers': [{ 'color': '#46bcec' }, { 'visibility': 'on' }] }, { 'featureType': 'water', 'elementType': 'geometry.fill', 'stylers': [{ 'saturation': '-100' }] }, { 'featureType': 'water', 'elementType': 'labels.text', 'stylers': [{ 'lightness': '100' }, { 'weight': '0.38' }] }],
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

  google.maps.event.addListener(App.map, 'idle', function () {
    App.getAccidents(App.map.getBounds(), App.map.getZoom());
  });
};

App.getAccidents = function (bounds, zoom) {
  var _this = this;

  bounds = [bounds.getSouthWest().lng().toFixed(8), bounds.getSouthWest().lat().toFixed(8), bounds.getNorthEast().lng().toFixed(8), bounds.getNorthEast().lat().toFixed(8)].join(',');

  $.get('https://api.cyclestreets.net/v2/collisions.locations?bbox=' + bounds + '&casualtiesinclude=cyclist&limit=400&datetime=friendly&jitter=1&zoom=' + zoom + '&key=1a427e08203905dd').done(function (data) {
    var filteredData = data.features.filter(function (accident) {
      return ['serious', 'fatal'].includes(accident.properties.severity);
      // return accident.properties.severity === 'serious' && accident.properties.severity === 'fatal';
    });
    _this.loopThroughArray(filteredData);
  });
};

App.loopThroughArray = function (data) {
  console.log(data);

  // console.log('inside loop through array');
  App.markers = data.map(function (feature, index) {
    return App.addMarkerForAccident(feature);
    // console.log(feature);
  });

  var mcOptions = { styles: [{
      height: 53,
      url: '/images/circles-01.png',
      width: 53
    }, {
      height: 56,
      url: '/images/circles-02.png',
      width: 56
    }, {
      height: 66,
      url: '/images/circles-03.png',
      width: 66
    }, {
      height: 78,
      url: '/images/circles-04.png',
      width: 78
    }, {
      height: 90,
      url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      width: 90
    }] };
  var markerCluster = new MarkerClusterer(App.map, App.markers, mcOptions);
};

App.addMarkerForAccident = function (feature) {
  var latlng = new google.maps.LatLng(parseFloat(feature.properties.latitude), parseFloat(feature.properties.longitude));
  var marker = new google.maps.Marker({
    position: latlng,
    map: App.map,
    icon: '/images/crash-02.png'

  });
  App.addInfoWindowForAccident(feature, marker);
  return marker;
};
//add info window for accident
App.addInfoWindowForAccident = function (feature, marker) {
  var _this2 = this;

  google.maps.event.addListener(marker, 'click', function () {
    if (typeof _this2.infoWindow !== 'undefined') _this2.infoWindow.close();

    var image;
    if (feature.properties.severity === 'fatal') {
      image = 'skull';
    } else {
      image = 'serious';
    }

    _this2.infoWindow = new google.maps.InfoWindow({
      maxWidth: 200,
      content: '\n      <div class="info-window">\n      <img src= "../images/' + image + '.png"/>\n      <h6><strong>Severity:</strong> ' + feature.properties.severity + '</h6>\n      <p><strong>Time of day:</strong> ' + feature.properties.datetime + '</p>\n      <p><strong>casualties:</strong> ' + feature.properties.casualties + '</p>\n      <p><strong>number of casualties:</strong> ' + feature.properties.Number_of_Casualties + '</p>\n      </div>\n      '
    });
    _this2.infoWindow.open(_this2.map, marker);
  });
};
App.loggedInState = function () {
  console.log('inside app.loggedInState');
  $('.loggedIn').show();
  $('.map').show();
  $('.loggedOut').hide();
  this.$main.html('\n    <div id="canvas"></div>\n    ');
  console.log('this', this);
  this.createMap();
};
App.loggedOutState = function () {
  $('.loggedIn').hide();
  $('.loggedOut').show();
  this.homepage();
};

App.register = function (e) {
  if (e) e.preventDefault();

  $('.modal-content').html('\n      <form method="post" action="/register">\n      <div class="modal-header">\n      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n      <h4 class="modal-title">Register</h4>\n      </div>\n      <div class="modal-body">\n\n      <div class="form-group">\n      <input class="form-control" type="text" name="user[username]" placeholder="Username">\n      </div>\n      <div class="form-group">\n      <input class="form-control" type="email" name="user[email]" placeholder="Email">\n      </div>\n      <div class="form-group">\n      <input class="form-control" type="password" name="user[password]" placeholder="Password">\n      </div>\n      <div class="form-group">\n      <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">\n      </div>\n\n\n      </div>\n      <div class="modal-footer">\n      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n      <button type="submit" class="btn btn-primary">Register</button>\n      </div>\n      </form>');

  $('.modal').modal('show');
};

App.login = function (e) {
  e.preventDefault();
  $('.modal-content').html('\n        <form method="post" action="/login">\n        <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h4 class="modal-title">Login</h4>\n        </div>\n        <div class="modal-body">\n\n        <form method="post" action="/login">\n        <div class="form-group">\n        <input class="form-control" type="email" name="email" placeholder="Email">\n        </div>\n        <div class="form-group">\n        <input class="form-control" type="password" name="password" placeholder="Password">\n        </div>\n\n\n        </div>\n        <div class="modal-footer">\n        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n        <button type="submit" class="btn btn-primary">Login</button>\n        </div>\n        </form>\n        ');
  $('.modal').modal('show');
};
App.logout = function (e) {
  e.preventDefault();
  this.removeToken();
  this.loggedOutState();
};

App.homepage = function () {
  this.$main.html('\n\n          <div class="jumbotron jumbotron-fluid">\n\n          <div class="container">\n          <div id="copy">\n          <h1 class="display-3">Cycle Safe</h1>\n            <p id="intro" class="lead"> Mapping the cycling accident hotspots in UK</p>\n          </div>\n\n          <div class="holder">\n          <div id="boxOne" class="box fade-in one">\n          <img src= "../images/circles_large-01.png"/>\n          </div>\n          <div id="boxTwo" class="box fade-in two">\n          <img src= "../images/circles_large-02.png"/>\n          </div>\n          <div id="boxThree" class="box fade-in three">\n          <img src= "../images/circles_large-03.png"/>\n          </div>\n          </div>\n          </div>\n\n          </div>\n          </div>\n\n          ');
};

App.handleForm = function (e) {
  $('.modal').modal('hide');
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