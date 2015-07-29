(function () {
    'use strict';

    angular
        .module('bneIntranet2')
        .service('bneGeocodes', bneGeocodes);


    function bneGeocodes() {
        /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
        /*  Latitude/longitude spherical geodesy formulae & scripts (c) Chris Veness 2002-2010            */
        /*   - www.movable-type.co.uk/scripts/latlong.html                                                */
        /*                                                                                                */
        /*  Sample usage:                                                                                 */
        /*    var p1 = new LatLon(51.5136, -0.0983);                                                      */
        /*    var p2 = new LatLon(51.4778, -0.0015);                                                      */
        /*    var dist = p1.distanceTo(p2);          // in km                                             */
        /*    var brng = p1.bearingTo(p2);           // in degrees clockwise from north                   */
        /*    ... etc                                                                                     */
        /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

        /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
        /*  Note that minimal error checking is performed in this example code!                           */
        /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */


        /**
         * Creates a point on the earth's surface at the supplied latitude / longitude
         *
         * @constructor
         * @param {Number} lat: latitude in numeric degrees
         * @param {Number} lon: longitude in numeric degrees
         * @param {Number} [rad=6371]: radius of earth if different value is required from standard 6,371km
         */
        this.LatLon = function (lat, lon, rad) {
            if (typeof(rad) === 'undefined'){ rad = 6371; } // earth's mean radius in km
            // only accept numbers or valid numeric strings
            this._lat = typeof(lat) === 'number' ? lat : typeof(lat) === 'string' && lat.trim() !== '' ? +lat : NaN;
            this._lon = typeof(lat) === 'number' ? lon : typeof(lon) === 'string' && lon.trim() !== '' ? +lon : NaN;
            this._radius = typeof(rad) === 'number' ? rad : typeof(rad) === 'string' && trim(lon) !== '' ? +rad : NaN;
        };


        /**
         * Returns the distance from this point to the supplied point, in km
         * (using Haversine formula)
         *
         * from: Haversine formula - R. W. Sinnott, "Virtues of the Haversine",
         *       Sky and Telescope, vol 68, no 2, 1984
         *
         * @param   {LatLon} point: Latitude/longitude of destination point
         * @param   {Number} [precision=4]: no of significant digits to use for returned value
         * @returns {Number} Distance in km between this point and destination point
         */
        this.distanceTo = function (point, precision) {
            // default 4 sig figs reflects typical 0.3% accuracy of spherical model
            if (typeof precision === 'undefined'){ precision = 4; }

            var R = this._radius;
            var lat1 = this._lat.toRad(), lon1 = this._lon.toRad();
            var lat2 = point._lat.toRad(), lon2 = point._lon.toRad();
            var dLat = lat2 - lat1;
            var dLon = lon2 - lon1;

            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1) * Math.cos(lat2) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c;
            return d.toPrecision(precision);
        };


        /**
         * Returns the (initial) bearing from this point to the supplied point, in degrees
         *   see http://williams.best.vwh.net/avform.htm#Crs
         *
         * @param   {LatLon} point: Latitude/longitude of destination point
         * @returns {Number} Initial bearing in degrees from North
         */
        this.bearingTo = function (point) {
            var lat1 = this._lat.toRad(), lat2 = point._lat.toRad();
            var dLon = (point._lon - this._lon).toRad();

            var y = Math.sin(dLon) * Math.cos(lat2);
            var x = Math.cos(lat1) * Math.sin(lat2) -
                Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
            var brng = Math.atan2(y, x);

            return (brng.toDeg() + 360) % 360;
        };


        /**
         * Returns final bearing arriving at supplied destination point from this point; the final bearing
         * will differ from the initial bearing by varying degrees according to distance and latitude
         *
         * @param   {LatLon} point: Latitude/longitude of destination point
         * @returns {Number} Final bearing in degrees from North
         */
        this.finalBearingTo = function (point) {
            // get initial bearing from supplied point back to this point...
            var lat1 = point._lat.toRad(), lat2 = this._lat.toRad();
            var dLon = (this._lon - point._lon).toRad();

            var y = Math.sin(dLon) * Math.cos(lat2);
            var x = Math.cos(lat1) * Math.sin(lat2) -
                Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
            var brng = Math.atan2(y, x);

            // ... & reverse it by adding 180Â°
            return (brng.toDeg() + 180) % 360;
        };


        /**
         * Returns the midpoint between this point and the supplied point.
         *   see http://mathforum.org/library/drmath/view/51822.html for derivation
         *
         * @param   {LatLon} point: Latitude/longitude of destination point
         * @returns {LatLon} Midpoint between this point and the supplied point
         */
        this.midpointTo = function (point) {
            var lat1 = this._lat.toRad();
            var lon1 = this._lon.toRad();
            var lat2 = point._lat.toRad();
            var dLon = (point._lon - this._lon).toRad();

            var Bx = Math.cos(lat2) * Math.cos(dLon);
            var By = Math.cos(lat2) * Math.sin(dLon);

            var lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2),
                Math.sqrt((Math.cos(lat1) + Bx) * (Math.cos(lat1) + Bx) + By * By));
            var lon3 = lon1 + Math.atan2(By, Math.cos(lat1) + Bx);

            return new LatLon(lat3.toDeg(), lon3.toDeg());
        };


        /**
         * Returns the destination point from this point having travelled the given distance (in km) on the
         * given initial bearing (bearing may vary before destination is reached)
         *
         *   see http://williams.best.vwh.net/avform.htm#LL
         *
         * @param   {Number} brng: Initial bearing in degrees
         * @param   {Number} dist: Distance in km
         * @returns {LatLon} Destination point
         */
        this.destinationPoint = function (brng, dist) {
            dist = typeof(dist) === 'number' ? dist : typeof(dist) === 'string' && dist.trim() !== '' ? +dist : NaN;
            dist = dist / this._radius;  // convert dist to angular distance in radians
            brng = brng.toRad();  //
            var lat1 = this._lat.toRad(), lon1 = this._lon.toRad();

            var lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) +
                Math.cos(lat1) * Math.sin(dist) * Math.cos(brng));
            var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(dist) * Math.cos(lat1),
                    Math.cos(dist) - Math.sin(lat1) * Math.sin(lat2));
            lon2 = (lon2 + 3 * Math.PI) % (2 * Math.PI) - Math.PI;  // normalise to -180...+180

            return new LatLon(lat2.toDeg(), lon2.toDeg());
        };



    }

})();

if (typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    };
}