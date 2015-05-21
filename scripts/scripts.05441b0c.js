"use strict";angular.module("soundCribApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","plangular"]).config(["$routeProvider","plangularConfigProvider",function(a,b){b.clientId="bc5a4908b1f2c9eb5d1a31bc80dc6614",a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/artists",{templateUrl:"views/artists.html",controller:"ArtistsCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("soundCribApp").controller("MainCtrl",["$scope",function(a){a.mixes=[{name:"SoundCrib Mix #1",url:"http://soundcloud.com/soundcrib/sets/soundcrib",active:!1,defaultMix:!1},{name:"SoundCrib Mix #2",url:"http://soundcloud.com/soundcrib/sets/soundcrib-mix-2",active:!0,defaultMix:!0}],a.filterDefault=function(a){return a.defaultMix!==!0},a.artists=[{name:"A$AP Rocky",url:"https://soundcloud.com/asap-rocky/sets/liveloveasap",imgURL:"assets/images/artists/asap-rocky.jpg",active:!1},{name:"Kygo",url:"https://soundcloud.com/soundcrib/sets/kygo",imgURL:"assets/images/artists/kygo.jpg",active:!1},{name:"Avicii",url:"https://soundcloud.com/soundcrib/sets/avicii-1",imgURL:"assets/images/artists/avicii.jpg",active:!1},{name:"Schoolboy Q",url:"https://soundcloud.com/soundcrib/sets/schoolboy-q",imgURL:"assets/images/artists/schoolboyq.jpg",active:!1}]}]),angular.module("soundCribApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("soundCribApp").controller("ArtistsCtrl",["$scope",function(a){a.artists=[{name:"A$AP Rocky",url:"https://soundcloud.com/asap-rocky/sets/liveloveasap",imgURL:"assets/images/artists/asap-rocky.jpg",active:!1},{name:"Kygo",url:"https://soundcloud.com/soundcrib/sets/kygo",imgURL:"assets/images/artists/kygo.jpg",active:!1},{name:"Avicii",url:"https://soundcloud.com/soundcrib/sets/avicii-1",imgURL:"assets/images/artists/avicii.jpg",active:!1},{name:"Schoolboy Q",url:"https://soundcloud.com/soundcrib/sets/schoolboy-q",imgURL:"assets/images/artists/schoolboyq.jpg",active:!1}]}]);