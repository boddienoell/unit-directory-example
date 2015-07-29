!function(){"use strict";angular.module("bneIntranet2",["ngTouch","ngSanitize","ui.router","ngMaterial"])}(),function(){"use strict";function t(){function t(t,e,i){var n=this;n.changeShowFrame=function(t){var e=n.unit.showFrame;switch(t){case"next":2===e?n.unit.showFrame=0:n.unit.showFrame++;break;case"prev":0===e?n.unit.showFrame=3:n.unit.showFrame--}},n.callStore=function(e){t.location.href="tel:"+e},n.getDirections=function(t,i){switch(e.getMap()){case"apple":return"maps://maps.apple.com/?q="+t+","+i;case"google":return"http://maps.google.com/?q="+t+","+i;case"bing":return"http://bing.com/maps/default.aspx?sp=point."+t+"~"+i+"&lvl=15";default:return"http://maps.google.com/?q="+t+","+i}},n.toggleFavorites=function(t){i.updateFavorite(t)},n.toggleCard=function(){n.unit.show=n.unit.show?0:1}}var e={restrict:"E",templateUrl:"app/components/unitCard/UnitCard.html",scope:{},controller:t,controllerAs:"vm",bindToController:{unit:"=unit",details:"=details",idx:"=idx"}};return t.$inject=["$window","bneSettings","bneUnit"],e}angular.module("bneIntranet2").directive("bneUnitCard",t)}(),function(){"use strict";function t(){function t(){var t=m.defer(),e=u.get(f);return e.success(function(e){v.setUnits(e),t.resolve(e)}),e.error(function(){t.resolve(!1)}),t.promise}function e(){var t=m.defer();return t.resolve(v.getUnits()),t.promise}function i(){var t=m.defer(),e=u.get("assets/data/geocodes.json");return e.success(function(e){t.resolve(e)}),e.error(function(){t.resolve(!1)}),t.promise}function n(){var t=m.defer(),e=u.get(g);return e.success(function(e){v.setDetails(e),t.resolve(e)}),e.error(function(){t.resolve(!1)}),t.promise}function a(){var t=m.defer();return t.resolve(v.getDetails()),t.promise}var o,s,r,l,d,c,u,m,v,f="assets/data/geocodes.json",g="";this.setService=function(t,e,i,n){c=t.getToken,f+=c,g+=c,u=e,m=i,v=n},this.getData=function(){var c=m.defer(),u=t(),v=e(),f=i(),g=n(),h=a(),p=m.all([u.then(function(t){o=t}),v.then(function(t){s=t}),f.then(function(t){r=t}),g.then(function(t){l=t}),h.then(function(t){d=t})]);return p.then(function(){var t={units:null,details:null};t.units=o?o:s?s:r,l?t.details=l:d&&(t.details=d),c.resolve(t)}),c.promise}}angular.module("bneIntranet2").service("bneUnitApi",t)}(),function(){"use strict";function t(t){var e,i,n=[];this.getUnits=function(){return e},this.getDetails=function(){return i},this.getFavorites=function(){return n},this.setUnits=function(t){e=t},this.setDetails=function(t){i=t},this.setFavorites=function(t){n=t},this.updateFavorite=function(i){e[i].favorite=e[i].favorite?0:1;var a=_.indexOf(n,e[i]);-1===a?n.push(e[i]):_.pullAt(n,a,1),console.log(_.uniq(n,"unit_number")),t.setFavs(_.uniq(n,"unit_number"))}}angular.module("bneIntranet2").service("bneUnit",t),t.$inject=["bneLocalStorage"]}(),function(){"use strict";function t(){function t(){return""}this.getToken=t()}angular.module("bneIntranet2").service("bneToken",t)}(),function(){"use strict";function t(){function t(t,e,i,n,a){var o=this;o.data={},o.data.units=a.getUnits(),o.data.details=a.getDetails(),o.favoriteFilter={favorite:1},o.dataLoaded=!1,o.noMore=!1,o.limitNumber=10,o.closestStores=[],o.clearFavorites=function(){_.forEach(t.units,function(e,i){t.units[i].favorite=0}),o.units=t.units,t.$emit("setFavorites","clear")},o.updateTotal=function(){o.limitUpdating=!0,e(function(){o.limitNumber=o.limitNumber+50},750),e(function(){o.limitUpdating=!1},2e3)},o.getClosestStore=function(){t.$emit("loadingStart"),n.navigator.geolocation.getCurrentPosition(function(e){var n,a=_.cloneDeep(i);i.LatLon(e.coords.latitude,e.coords.longitude);var s=[];_.forEach(o.data.units,function(t){a.LatLon(t.unit_geocode_latitude,t.unit_geocode_longitude);var e=i.distanceTo(a);s.push({unit:t,distance:Math.floor(1*e)})}),s=_.sortBy(s,"distance"),n=_.pluck(s,"unit"),o.closestStores=n,t.$emit("loadingEnd"),t.$digest()})},t.$on("filtersUpdated",function(){o.searchFilter=t.searchFilter})}var e={restrict:"E",templateUrl:"app/components/tabs/tabs.html",scope:{data:"=",favorites:"="},controller:t,controllerAs:"view",bindToController:!0};return t.$inject=["$rootScope","$timeout","bneGeocodes","$window","bneUnit"],e}angular.module("bneIntranet2").directive("bneTabs",t)}(),function(){"use strict";function t(t,e){function i(){a=t.getSettings()}function n(e,i){a||(a={}),a[e]=i,t.setSettings(a)}var a={};this.getNotifications=function(){return a?_.isUndefined(a.notifications)?null:a.notifications:null},this.setNotifications=function(t){t&&e.subscribe(),n("notifications",t)},this.getMap=function(){return a?_.isUndefined(a.map)?null:a.map:null},this.setMap=function(t){n("map",t)},this.getDevice=function(){return a?_.isUndefined(a.device)?null:a.device:null},this.setDevice=function(t){n("device",t)},i()}angular.module("bneIntranet2").service("bneSettings",t),t.$inject=["bneLocalStorage","bneNotifications"]}(),function(){"use strict";function t(){function t(t,e){t.device=e.getDevice(),t.map=e.getMap(),t.notifications=e.getNotifications(),t.updateSettings=function(){e.setDevice(t.device),e.setMap(t.map),e.setNotifications(t.notifications)}}var e={restrict:"E",templateUrl:"app/components/settings/settings.html",controller:t,bindToController:!0};return t.$inject=["$scope","bneSettings"],e}angular.module("bneIntranet2").directive("bneSettingsView",t)}(),function(){"use strict";function t(t){function e(){navigator.serviceWorker.ready.then(function(t){return"showNotification"in ServiceWorkerRegistration.prototype?"denied"===Notification.permission?void console.warn("The user has blocked notifications."):"PushManager"in window?void t.pushManager.subscribe({userVisibleOnly:!0}).then(function(t){i(t.subscriptionId),console.log(t)})["catch"](function(t){alert(Notification.permission),"denied"===Notification.permission?console.log("Permission for Notifications was denied"):console.log("Unable to subscribe to push.",t)}):void console.warn("Push messaging isn't supported."):void console.warn("Notifications aren't supported.")})}function i(e){t.post("https://mybne.com/wp-json/bne-nr/chrome",{key:e})}"serviceWorker"in navigator&&(navigator.serviceWorker.register("/service-worker.js").then(function(t){}),this.subscribe=function(){"serviceWorker"in navigator?navigator.serviceWorker.register("/service-worker.js").then(e):console.warn("Service workers aren't supported in this browser.")})}angular.module("bneIntranet2").service("bneNotifications",t),t.$inject=["$http"]}(),function(){"use strict";function t(){function t(t,e,i){t.$on("filtersUpdated",function(){e.filterActive=t.filterActive}),e.openFilter=function(){i("filterNav").toggle()}}var e={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:t,controllerAs:"vm",bindToController:!0};return t.$inject=["$rootScope","$scope","$mdSidenav"],e}angular.module("bneIntranet2").directive("acmeNavbar",t)}(),function(){"use strict";function t(){function t(t){return JSON.parse(localStorage.getItem(t))}function e(t,e){return localStorage.setItem(t,JSON.stringify(e))}var i,n,a,o,s,r="units",l="details",d="favs",c="filters",u="settings";this.getUnits=function(){return i||(i=t(r)),i},this.setUnits=function(t){e(r,t)},this.getDetails=function(){return n||(n=t(l)),n},this.setDetails=function(t){return e(l,t)},this.getFavs=function(){return a||(a=t(d)),a},this.setFavs=function(t){return e(d,t)},this.getFilters=function(){return o||(o=t(c)),o||"clear"},this.setFilters=function(t){return e(c,t)},this.getSettings=function(){return s||(s=t(u)),s},this.setSettings=function(t){return e(u,t)}}angular.module("bneIntranet2").service("bneLocalStorage",t)}(),function(){"use strict";function t(){/*  Latitude/longitude spherical geodesy formulae & scripts (c) Chris Veness 2002-2010            */
/*   - www.movable-type.co.uk/scripts/latlong.html                                                */
/*                                                                                                */
/*  Sample usage:                                                                                 */
/*    var p1 = new LatLon(51.5136, -0.0983);                                                      */
/*    var p2 = new LatLon(51.4778, -0.0015);                                                      */
/*    var dist = p1.distanceTo(p2);          // in km                                             */
/*    var brng = p1.bearingTo(p2);           // in degrees clockwise from north                   */
/*    ... etc                                                                                     */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
this.LatLon=function(t,e,i){"undefined"==typeof i&&(i=6371),this._lat="number"==typeof t?t:"string"==typeof t&&""!==t.trim()?+t:0/0,this._lon="number"==typeof t?e:"string"==typeof e&&""!==e.trim()?+e:0/0,this._radius="number"==typeof i?i:"string"==typeof i&&""!==trim(e)?+i:0/0},this.distanceTo=function(t,e){"undefined"==typeof e&&(e=4);var i=this._radius,n=this._lat.toRad(),a=this._lon.toRad(),o=t._lat.toRad(),s=t._lon.toRad(),r=o-n,l=s-a,d=Math.sin(r/2)*Math.sin(r/2)+Math.cos(n)*Math.cos(o)*Math.sin(l/2)*Math.sin(l/2),c=2*Math.atan2(Math.sqrt(d),Math.sqrt(1-d)),u=i*c;return u.toPrecision(e)},this.bearingTo=function(t){var e=this._lat.toRad(),i=t._lat.toRad(),n=(t._lon-this._lon).toRad(),a=Math.sin(n)*Math.cos(i),o=Math.cos(e)*Math.sin(i)-Math.sin(e)*Math.cos(i)*Math.cos(n),s=Math.atan2(a,o);return(s.toDeg()+360)%360},this.finalBearingTo=function(t){var e=t._lat.toRad(),i=this._lat.toRad(),n=(this._lon-t._lon).toRad(),a=Math.sin(n)*Math.cos(i),o=Math.cos(e)*Math.sin(i)-Math.sin(e)*Math.cos(i)*Math.cos(n),s=Math.atan2(a,o);return(s.toDeg()+180)%360},this.midpointTo=function(t){var e=this._lat.toRad(),i=this._lon.toRad(),n=t._lat.toRad(),a=(t._lon-this._lon).toRad(),o=Math.cos(n)*Math.cos(a),s=Math.cos(n)*Math.sin(a),r=Math.atan2(Math.sin(e)+Math.sin(n),Math.sqrt((Math.cos(e)+o)*(Math.cos(e)+o)+s*s)),l=i+Math.atan2(s,Math.cos(e)+o);return new LatLon(r.toDeg(),l.toDeg())},this.destinationPoint=function(t,e){e="number"==typeof e?e:"string"==typeof e&&""!==e.trim()?+e:0/0,e/=this._radius,t=t.toRad();var i=this._lat.toRad(),n=this._lon.toRad(),a=Math.asin(Math.sin(i)*Math.cos(e)+Math.cos(i)*Math.sin(e)*Math.cos(t)),o=n+Math.atan2(Math.sin(t)*Math.sin(e)*Math.cos(i),Math.cos(e)-Math.sin(i)*Math.sin(a));return o=(o+3*Math.PI)%(2*Math.PI)-Math.PI,new LatLon(a.toDeg(),o.toDeg())}}angular.module("bneIntranet2").service("bneGeocodes",t)}(),"undefined"==typeof Number.prototype.toRad&&(Number.prototype.toRad=function(){return this*Math.PI/180}),function(){"use strict";function t(){function t(t,e){var i=this;i.close=function(){t.$emit("loadingStart"),t.$emit("filtersUpdated",i.searchFilter);var n=e("filterNav").close();n.then(function(){t.$emit("loadingEnd")})},i.clearFilter=function(){t.$emit("loadingStart"),t.$emit("filtersUpdated","clear");var i=e("filterNav").close();i.then(function(){t.$emit("loadingEnd")})},i.closeKeyBoard=function(){return!1}}var e={restrict:"E",templateUrl:"app/components/filters/filters.html",scope:{states:"=",cities:"="},controller:t,controllerAs:"view",bindToController:!0};return t.$inject=["$rootScope","$mdSidenav"],e}angular.module("bneIntranet2").directive("bneFilters",t)}(),function(){"use strict";function t(){function t(){return _.keys(n)}function e(){return n}var i,n={};this.setData=function(t){var e=_.groupBy(t,"unit_state");return _.forEach(e,function(t,e){n[e]=_.uniq(t,function(t){return t.unit_city}),n[e]=_.sortByOrder(n[e],["unit_name"])}),i=_.keys(this.citiesByState),!0},this.getStates=t(),this.getCitiesByState=e()}angular.module("bneIntranet2").service("bneCityState",t)}(),function(){"use strict";function t(t,e,i,n,a,o){var s=this;t.$emit("filtersUpdated",i.getFilters()),t.$on("loadingStart",function(){t.loading=!0,n(function(){t.loading&&(t.loading=!1,a.error("Loading exceeded max time of 10 secs"))},1e4)}),t.$on("loadingEnd",function(){t.loading=!1}),t.$on("setFavorites",function(e,n){if("clear"===n)t.favorites=[];else{var a=-1;_.forEach(t.favorites,function(t,e){n.unit_number===t.unit_number&&(a=e)}),-1===a?t.favorites.push(n):_.pullAt(t.favorites,a),t.favorites=_.uniq(t.favorites,function(t){return t.unit_number})}i.setFavs(t.favorites),t.$broadcast("setFavoritesComplete")}),t.$on("filtersUpdated",function(e,n){var a={unit_name:"",unit_number:"",unit_city:"",unit_state:""};"clear"!==n&&_.difference(_.values(n),_.values(a)).length?(t.filterActive=!0,t.searchFilter=n):(t.filterActive=!1,t.searchFilter=a),i.setFilters(t.searchFilter)}),t.$on("dataProcessed",function(t,i){o.setUnits(i.units),o.setDetails(i.details),s.data={},s.data.units=o.getUnits(),s.data.details=o.getDetails(),s.favorites=o.getFavorites(),e.setData(i.units),s.cities=e.getCitiesByState,s.states=_.keys(s.cities)})}angular.module("bneIntranet2").controller("MainController",t),t.$inject=["$rootScope","bneCityState","bneLocalStorage","$timeout","$log","bneUnit"]}(),function(){"use strict";function t(t,e,i,n,a,o,s,r){t.$emit("loadingStart"),a.setService(o,e,i,s);var l=a.getData();l.then(function(e){var i=s.getFavs();r.setFavorites(i),_.forEach(e.units,function(t,n){_.forEach(i,function(i){t.favorite||(e.units[n].favorite=t.unit_number==i.unit_number?1:0)})}),t.$emit("dataProcessed",e),n(function(){t.$emit("loadingEnd")},1e3)})}angular.module("bneIntranet2").run(t),t.$inject=["$rootScope","$http","$q","$timeout","bneUnitApi","bneToken","bneLocalStorage","bneUnit"]}(),function(){"use strict";function t(t,e){t.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"view"}),e.otherwise("/")}angular.module("bneIntranet2").config(t),t.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";angular.module("bneIntranet2").constant("toastr",toastr)}(),function(){"use strict";function t(t,e,i,n){n.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|maps):/),t.debugEnabled(!0),e.options.timeOut=3e3,e.options.positionClass="toast-bottom-right",e.options.preventDuplicates=!0,e.options.progressBar=!0,i.theme("default").primaryPalette("indigo")}angular.module("bneIntranet2").config(t),t.$inject=["$logProvider","toastr","$mdThemingProvider","$compileProvider"]}(),angular.module("bneIntranet2").run(["$templateCache",function(t){t.put("app/main/main.html",'<div layout="row" style="height:100vh"><md-content flex="100"><div layout="row" layout-align="space-around" class="loading" ng-show="loading"><md-progress-circular md-mode="view.indeterminate"></md-progress-circular></div><header><acme-navbar></acme-navbar></header><aside><bne-filters states="view.states" cities="view.cities"></bne-filters></aside><bne-tabs data="view.data" favorites="favorites"></bne-tabs></md-content></div>'),t.put("app/components/filters/filters.html",'<md-sidenav class="md-sidenav-right md-whiteframe-z2" md-component-id="filterNav"><md-content layout-padding=""><md-header>Filters:</md-header><form ng-submit="closeKeyBoard()"><md-input-container><label for="unitNumber">Unit Number:</label> <input type="number" id="unitNumber" ng-model="view.searchFilter.unit_number"></md-input-container><md-input-container><label for="unitName">Unit Name:</label> <input type="text" id="unitName" ng-model="view.searchFilter.unit_name"></md-input-container><md-select placeholder="State" ng-model="view.searchFilter.unit_state"><md-option value="NC">North Carolina</md-option><md-option value="VA">Virgina</md-option><md-option value="SC">South Carolina</md-option><md-option value="KY">Kentucky</md-option></md-select><md-select placeholder="City" ng-model="view.searchFilter.unit_city" ng-repeat="state in view.states" ng-show="(state == view.searchFilter.unit_state )"><md-option ng-repeat="city in view.cities[state] | orderBy: unit_city" value="{{city.unit_city}}">{{city.unit_city}}</md-option></md-select><input type="submit" style="position: absolute; left: -9999px; width: 1px; height: 1px;"></form><div layout="row"><div flex="50"><md-button ng-click="view.clearFilter()" layout="" layout-align="center center">Clear</md-button></div><div flex="50"><md-button ng-click="view.close()" layout="" layout-align="center center">Apply</md-button></div></div></md-content></md-sidenav>'),t.put("app/components/navbar/navbar.html",'<md-toolbar layout="row"><div flex="20" layout="row" layout-align="center center"><img ng-src="assets/images/logo.png"></div><div flex="60" layout="row" layout-align="center center"><h1>Unit Directory</h1></div><div flex="20" layout="row" layout-align="center center" ng-click="openFilter()" ng-class="{\'filter-active\': filterActive }"><i class="fa fa-filter"></i></div></md-toolbar>'),t.put("app/components/settings/settings.html",'<md-divider></md-divider><section layout="row" layout-align="center center" class="notifications"><md-switch ng-model="notifications" aria-label="Switch 1" ng-change="updateSettings()" ng-disabled="( device == \'andriod\' )">Notifications <span ng-bind="(notifications) ? \'On\': \'Off\'"></span></md-switch></section><md-divider></md-divider><section layout="column" layout-align="start center" class="map settings"><span class="md-raised title">Preferred Map Service</span><md-radio-group ng-model="map" ng-change="updateSettings()"><md-radio-button value="google">Google Maps</md-radio-button><md-radio-button value="apple">Apple Maps</md-radio-button><md-radio-button value="bing">Bing Maps :(</md-radio-button></md-radio-group></section><md-divider></md-divider><section layout="column" layout-align="start center" class="browser settings"><span class="md-raised title">Platform Used</span><md-radio-group ng-model="device" ng-change="updateSettings()"><md-radio-button value="android">Android</md-radio-button><md-radio-button value="mac">Apple Product</md-radio-button><md-radio-button value="win">Windows</md-radio-button></md-radio-group></section><md-divider></md-divider><section layout="row" layout-align="center center" class="settings"><md-button class="md-raised md-warn" data-ng-click="clearFavorites()">Clear Favorites</md-button></section>'),t.put("app/components/tabs/tabs.html",'<md-tabs md-selected="0" md-autoselect="" md-dynamic-height="1" md-no-disconnect="1" md-swipe-content="1" md-no-ink="1"><md-tab id="all"><md-tab-label>All</md-tab-label><md-tab-body><md-content layout="" layout-wrap=""><bne-unit-card unit="unit" idx="$index" details="view.data.details[unit.unit_number]" data-ng-init="unit.show=0" ng-repeat="unit in filterdUnits = ( view.data.units | filter: view.searchFilter | orderBy : view.unit_number | limitTo: view.limitNumber )" flex="100" flex-gt-sm="50"></bne-unit-card></md-content><div ng-hide="view.noMore" ng-click="view.updateTotal()" layout="" layout-align="center" class="moreContainer"><div ng-hide="view.limitUpdating">Get 50 More</div><md-progress-linear ng-show="view.limitUpdating" md-mode="indeterminate"></md-progress-linear></div><div ng-show="view.noMore" layout="" layout-align="center" class="moreContainer"><div>No More</div></div></md-tab-body></md-tab><md-tab id="favs"><md-tab-label>Favs</md-tab-label><md-tab-body><md-content layout="" layout-wrap=""><bne-unit-card unit="fav" details="view.data.details[fav.unit_number]" ng-repeat="fav in view.data.units | filter : view.favoriteFilter | orderBy : unit_number" flex="100" flex-gt-sm="50"></bne-unit-card></md-content></md-tab-body></md-tab><md-tab id="settings"><md-tab-label><i class="fa fa-compass"></i></md-tab-label><md-tab-body><md-button class="md-raised md-primary" ng-click="view.getClosestStore()">Get Closest Store</md-button><md-content layout="" layout-wrap=""><bne-unit-card unit="unit" idx="$index" details="view.details[unit.unit_number]" data-ng-init="unit.show=0" ng-repeat="unit in filterdUnits = ( view.closestStores | orderBy : unit_number | limitTo: view.limitNumber )" flex="100" flex-gt-sm="50"></bne-unit-card></md-content></md-tab-body></md-tab><md-tab id="settings"><md-tab-label><i class="fa fa-cogs"></i></md-tab-label><md-tab-body><bne-settings-view></bne-settings-view></md-tab-body></md-tab></md-tabs>'),t.put("app/components/unitCard/UnitCard.html",'<md-card ng-class="{ inactive: ( ! vm.unit.show ) }"><div class="bookmark" data-ng-click="vm.toggleFavorites( vm.idx )"><i class="fa fa-bookmark-o bookmark" ng-show="!vm.unit.favorite"></i> <i class="fa fa-bookmark bookmark" ng-show="vm.unit.favorite"></i></div><md-card-content><h2 class="md-title" ng-click="vm.toggleCard()"><span ng-bind="::vm.unit.unit_name"></span> ( <span ng-bind="::vm.unit.unit_number"></span> )</h2><div layout="" layout-align="center center" class="card-content"><div flex="10" layout="" layout-align="center center" class="swipe-arrow"><i class="fa fa-angle-left" data-ng-click="vm.changeShowFrame(\'prev\', $index)"></i></div><div flex="80" layout="column" layout-align="center center" class="address" ng-init="vm.unit.showFrame=0"><div class="detail-frame" ng-show="vm.unit.showFrame == 0"><div><span ng-bind="::vm.unit.unit_address"></span></div><div><span ng-bind="::vm.unit.unit_city"></span>, <span ng-bind="::uv.unit.unit_state"></span> <span ng-bind="::vm.unit.unit_zip"></span></div><div><span ng-bind="::vm.unit.unit_phone"></span> (<span ng-bind="::vm.unit.unit_speed_dail"></span>)</div></div><div class="detail-frame" ng-show="(vm.unit.showFrame == 1)"><md-list><md-list-item class="md-1-line"><h3>VP</h3><div class="md-list-item-text"><h4 ng-bind="::vm.details[\'1\'].name"></h4></div></md-list-item><md-list-item class="md-1-line"><h3>Dir</h3><div class="md-list-item-text"><h4 ng-bind="::vm.details[\'2\'].name"></h4></div></md-list-item><md-list-item class="md-1-line"><h3>DM</h3><div class="md-list-item-text"><h4 ng-bind="::vm.details[\'3\'].name"></h4></div></md-list-item></md-list></div><div class="detail-frame" ng-show="(vm.unit.showFrame == 2)"><md-list><md-list-item class="md-1-line" ng-if="vm.details[\'4\'].name"><h3>A & P</h3><div class="md-list-item-text"><h4 ng-bind="::vm.details[\'4\'].name"></h4></div></md-list-item><md-list-item class="md-1-line" ng-if="vm.details[\'5\'].name"><h3>Tech</h3><div class="md-list-item-text"><h4 ng-bind="::vm.details[\'5\'].name"></h4></div></md-list-item><md-list-item class="md-1-line" ng-if="vm.details[\'6\'].name"><h3>FE</h3><div class="md-list-item-text"><h4 ng-bind="::vm.details[\'6\'].name"></h4></div></md-list-item><md-list-item class="md-1-line" ng-if="vm.details[\'9\'].name"><h3>Pay</h3><div class="md-list-item-text"><h4 ng-bind="::vm.details[\'9\'].name"></h4></div></md-list-item></md-list></div></div><div flex="10" layout="" layout-align="center center" class="swipe-arrow"><i class="fa fa-angle-right" data-ng-click="vm.changeShowFrame(\'next\', $index)"></i></div></div></md-card-content><div class="md-actions" layout="row" layout-align="center"><md-button flex="50" class="md-raised" layout="" layout-align="center" data-ng-click="vm.callStore(unit.unit_phone)"><i class="fa fa-phone"></i><md-tooltip>Call Unit</md-tooltip></md-button><md-button flex="50" class="md-raised" layout="" layout-align="center" data-ng-init="mapLink = vm.getDirections(unit.unit_geocode_latitude, unit.unit_geocode_longitude)"><a ng-href="{{vm.mapLink}}" target="_blank"><i class="fa fa-car"></i><md-tooltip>Get Directions</md-tooltip></a></md-button></div></md-card>')}]);