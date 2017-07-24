const App = App || {};
const google = google;

App.init = function() {
  // this.apiUrl = 'http://localhost:3000/api';
  this.apiUrl = `${window.location.origin}/api`;
  this.$main  = $('main');
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
App.homepage = function(){
  $('header h1').hide();
  this.$main.html(`<p>hello<p>`);
};

App.createMap = function() {
  console.log('inside createMap');
  const canvas = document.getElementById('canvas');
  const mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(51.506178, -0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [{'featureType':  'administrative','elementType':'all','stylers':[{' visibility':'off'}]},{'featureType':'administrative','elementType':'labels.text.fill','stylers':[{'color':'#444444'}]},{'featureType':'landscape','elementType':'all','stylers':[{'visibility':'simplified'},{'saturation':'-100'}]},{'featureType':'landscape','elementType':'geometry.fill','stylers':[{'lightness':20}]},{'featureType':'landscape','elementType':'labels.text','stylers':[{'visibility':'off'}]},{'featureType':'landscape','elementType':'labels.icon','stylers':[{'visibility':'off'}]},{'featureType':'landscape.man_made','elementType':'geometry.fill','stylers':[{'lightness':'-10'}]},{'featureType':'landscape.natural.landcover','elementType':'all','stylers':[{'visibility':'off'}]},{'featureType':'landscape.natural.terrain','elementType':'all','stylers':[{'visibility':'off'}]},{'featureType':'poi','elementType':'all','stylers':[{'visibility':'off'}]},{'featureType':'road','elementType':'all','stylers':[{'saturation':-100},{'lightness':45}]},{'featureType':'road','elementType':'geometry.stroke','stylers':[{'lightness':'-20'}]},{'featureType':'road','elementType':'labels.text','stylers':[{'lightness':'-65'},{'gamma':'1'},{'weight':'1'}]},{'featureType':'road.highway','elementType':'all','stylers':[{'visibility':'simplified'}]},{'featureType':'road.highway','elementType':'geometry.fill','stylers':[{'lightness':'100'},{'visibility':'on'}]},{'featureType':'road.highway','elementType':'geometry.stroke','stylers':[{'lightness':'46'},{'visibility':'on'}]},{'featureType':'road.highway','elementType':'labels.text','stylers':[{'visibility':'simplified'},{'lightness':'46'}]},{'featureType':'road.highway','elementType':'labels.text.fill','stylers':[{'gamma':'1'},{'lightness':'6'}]},{'featureType':'road.highway','elementType':'labels.icon','stylers':[{'visibility':'off'},{'lightness':'61'}]},{'featureType':'road.arterial','elementType':'all','stylers':[{'visibility':'on'}]},{'featureType':'road.arterial','elementType':'labels.text.fill','stylers':[{'visibility':'on'},{'lightness':'38'}]},{'featureType':'road.arterial','elementType':'labels.text.stroke','stylers':[{'visibility':'on'},{'lightness':'60'}]},{'featureType':'road.arterial','elementType':'labels.icon','stylers':[{'visibility':'off'}]},{'featureType':'road.local','elementType':'labels.text','stylers':[{'lightness':'30'}]},{'featureType':'road.local','elementType':'labels.text.fill','stylers':[{'visibility':'on'},{'lightness':'30'}]},{'featureType':'road.local','elementType':'labels.text.stroke','stylers':[{'visibility':'on'},{'lightness':'60'}]},{'featureType':'transit','elementType':'all','stylers':[{'visibility':'off'}]},{'featureType':'transit.line','elementType':'all','stylers':[{'visibility':'off'}]},{'featureType':'transit.station','elementType':'labels.icon','stylers':[{'visibility':'simplified'},{'saturation':'-100'}]},{'featureType':'transit.station.airport','elementType':'all','stylers':[{'visibility':'off'}]},{'featureType':'transit.station.bus','elementType':'labels.icon','stylers':[{'visibility':'off'}]},{'featureType':'transit.station.rail','elementType':'labels.text','stylers':[{'visibility':'on'}]},{'featureType':'transit.station.rail','elementType':'labels.icon','stylers':[{'visibility':'on'},{'saturation':'-100'},{'lightness':'0'},{'gamma':'0.50'}]},{'featureType':'water','elementType':'all','stylers':[{'color':'#46bcec'},{'visibility':'on'}]},{'featureType':'water','elementType':'geometry.fill','stylers':[{'saturation':'-100'}]},{'featureType':'water','elementType':'labels.text','stylers':[{'lightness':'100'},{'weight':'0.38'}]}],
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

  google.maps.event.addListener(App.map,'idle', function(){
    App.getAccidents(App.map.getBounds(), App.map.getZoom());
  });

};

App.getAccidents = function(bounds, zoom) {
  bounds = [
    bounds.getSouthWest().lng().toFixed(8),
    bounds.getSouthWest().lat().toFixed(8),
    bounds.getNorthEast().lng().toFixed(8),
    bounds.getNorthEast().lat().toFixed(8)
  ].join(',');

  $.get('https://api.cyclestreets.net/v2/collisions.locations?bbox=' + bounds + '&casualtiesinclude=cyclist&limit=400&datetime=friendly&jitter=1&zoom=' + zoom + '&key=1a427e08203905dd').done(data => {
    const filteredData = data.features.filter(accident => {
      return ['serious', 'fatal'].includes(accident.properties.severity);
      // return accident.properties.severity === 'serious' && accident.properties.severity === 'fatal';
    });
    this.loopThroughArray(filteredData);
  });
};


App.loopThroughArray = function(data){
  console.log(data);

  // console.log('inside loop through array');
  App.markers = data.map((feature, index) => {
    return App.addMarkerForAccident(feature);
    // console.log(feature);
  });

  const mcOptions = {styles: [{
    height: 53,
    url: '/images/circles-01.png',
    width: 53
  },
  {
    height: 56,
    url: '/images/circles-02.png',
    width: 56
  },
  {
    height: 66,
    url: '/images/circles-03.png',
    width: 66
  },
  {
    height: 78,
    url: '/images/circles-04.png',
    width: 78
  },
  {
    height: 90,
    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    width: 90
  }]}
  const markerCluster = new MarkerClusterer(App.map, App.markers, mcOptions);
};


App.addMarkerForAccident = function(feature){
  const latlng = new
  google.maps.LatLng(parseFloat(feature.properties.latitude), parseFloat(feature.properties.longitude));
  const marker = new google.maps.Marker({
    position: latlng,
    map: App.map,
    icon: '/images/crash-02.png',


  });
  App.addInfoWindowForAccident(feature, marker);
  return marker;

};
//add info window for accident
App.addInfoWindowForAccident = function(feature, marker) {
  google.maps.event.addListener(marker, 'click', () =>{
    if (typeof this.infoWindow !== 'undefined')
    this. infoWindow.close();

    var image;
    if (feature.properties.severity === 'fatal') {
     image = 'skull'
    } else {
     image = 'serious'
    }

    this.infoWindow = new google.maps.InfoWindow({
      maxWidth: 200,
      content: `
      <div class="info-window">
      <img src= "../images/${ image}.png"/>
      <h6><strong>Severity:</strong> ${ feature.properties.severity}</h6>
      <p><strong>Time of day:</strong> ${ feature.properties.datetime}</p>
      <p><strong>casualties:</strong> ${ feature.properties.casualties}</p>
      <p><strong>number of casualties:</strong> ${ feature.properties.Number_of_Casualties}</p>
      </div>
      `
    });
    this.infoWindow.open(this.map, marker);
  });
};
App.loggedInState = function(){
  console.log('inside app.loggedInState');
  $('.loggedIn').show();
  $('.map').show();
  $('.loggedOut').hide();
  this.$main.html(`
    <div id="canvas"></div>
    `);
    console.log('this', this);
    this.createMap();
  };
  App.loggedOutState = function(){
    $('.loggedIn').hide();
    $('.loggedOut').show();
    this.homepage();
  };

  App.register = function(e) {
    if (e) e.preventDefault();

    $('.modal-content').html(`
      <form method="post" action="/register">
      <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      <h4 class="modal-title">Register</h4>
      </div>
      <div class="modal-body">

      <div class="form-group">
      <input class="form-control" type="text" name="user[username]" placeholder="Username">
      </div>
      <div class="form-group">
      <input class="form-control" type="email" name="user[email]" placeholder="Email">
      </div>
      <div class="form-group">
      <input class="form-control" type="password" name="user[password]" placeholder="Password">
      </div>
      <div class="form-group">
      <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">
      </div>


      </div>
      <div class="modal-footer">
      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-primary">Register</button>
      </div>
      </form>`);

      $('.modal').modal('show');
    };


    App.login = function(e) {
      e.preventDefault();
      $('.modal-content').html(`
        <form method="post" action="/login">
        <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Login</h4>
        </div>
        <div class="modal-body">

        <form method="post" action="/login">
        <div class="form-group">
        <input class="form-control" type="email" name="email" placeholder="Email">
        </div>
        <div class="form-group">
        <input class="form-control" type="password" name="password" placeholder="Password">
        </div>


        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Login</button>
        </div>
        </form>
        `);
        $('.modal').modal('show');
      };
      App.logout = function(e){
        e.preventDefault();
        this.removeToken();
        this.loggedOutState();
      };

      App.homepage = function(){
        this.$main.html(`

          <div class="jumbotron jumbotron-fluid">

          <div class="container">
          <div id="copy">
          <h1 class="display-3">Cycle Safe</h1>
            <p id="intro" class="lead"> Mapping the cycling accident hotspots in UK</p>
          </div>

          <div class="holder">
          <div id="boxOne" class="box fade-in one">
          <img src= "../images/circles_large-01.png"/>
          </div>
          <div id="boxTwo" class="box fade-in two">
          <img src= "../images/circles_large-02.png"/>
          </div>
          <div id="boxThree" class="box fade-in three">
          <img src= "../images/circles_large-03.png"/>
          </div>
          </div>
          </div>

          </div>
          </div>

          `);
        };

        App.handleForm = function(e){
          $('.modal').modal('hide');
          console.log('submitted');
          e.preventDefault();
          const url    = `${App.apiUrl}${$(this).attr('action')}`;
          const method = $(this).attr('method');
          const data   = $(this).serialize();
          return App.ajaxRequest(url, method, data, data => {
            if (data.token) App.setToken(data.token);
            console.log('app.loggedInState should run');
            App.loggedInState();
          });
        };
        App.ajaxRequest = function(url, method, data, callback){
          return $.ajax({
            url,
            method,
            data,
            beforeSend: this.setRequestHeader.bind(this)
          })
          .done(callback)
          .fail(data => {
            console.log(data);
          });
        };
        App.setRequestHeader = function(xhr) {
          return xhr.setRequestHeader('Authorization', `Bearer ${this.getToken()}`);
        };
        App.setToken = function(token){
          return window.localStorage.setItem('token', token);
        };
        App.getToken = function(){
          return window.localStorage.getItem('token');
        };
        App.removeToken = function(){
          return window.localStorage.clear();
        };
        $(App.init.bind(App));
