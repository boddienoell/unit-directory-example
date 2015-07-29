(function(){
    'use strict';

    angular
        .module('bneIntranet2')
        .service('bneUnitApi', bneUnitApi);

        /** @ngInject */
        function bneUnitApi(){
            
            var dataUrl = 'assets/data/geocodes.json';
            var detailsUrl = '';

            var remoteData;
            var storedData;
            var defaultData;
            var remoteDetails;
            var storedDetails;

            var token;
            var call;
            var promise;
            var storage;

            this.setService = function(bneToken, http, q, bneLocalStorage){
                token       = bneToken.getToken;
                dataUrl     = dataUrl + token;
                detailsUrl  = detailsUrl + token;
                call        = http;
                promise     = q;
                storage     = bneLocalStorage;
            };

            this.getData = function(){

                var returnPromise = promise.defer();

                var remoteDataPromise = getRemoteData();

                var storedDataPromise = getStoredData();

                var defaultDataPromise = getDefaultData();

                var remoteDetailsPromise = getRemoteDetails();

                var storedDetailsPromise = getStoredDetails();

                var allData = promise.all([
                    remoteDataPromise.then(function(data){ remoteData = data; }),
                    storedDataPromise.then(function(data){ storedData = data; }),
                    defaultDataPromise.then(function(data){ defaultData = data; }),
                    remoteDetailsPromise.then(function(data){ remoteDetails = data; }),
                    storedDetailsPromise.then(function(data){ storedDetails = data; })
                ]);

                allData.then(function(){

                    var returnData = {'units':null, 'details':null };

                    if ( remoteData ){
                        returnData.units = remoteData;
                    }
                    else if ( storedData ){
                        returnData.units = storedData;
                    }
                    else {
                        returnData.units = defaultData;
                    }

                    if ( remoteDetails ){
                        returnData.details = remoteDetails;
                    } else if ( storedDetails ){
                        returnData.details = storedDetails;
                    }

                    returnPromise.resolve(returnData);

                });

                return returnPromise.promise;
            };

            function getRemoteData(){

                var returnPromise = promise.defer();

                var httpCall = call.get(dataUrl);
                    httpCall.success(function(data){
                        storage.setUnits(data);
                        returnPromise.resolve(data);
                    });
                    httpCall.error(function(){
                        returnPromise.resolve(false);
                    });
                return returnPromise.promise;
            }

            function getStoredData(){

                var returnPromise = promise.defer();

                    returnPromise.resolve( storage.getUnits() );

                return returnPromise.promise;

            }

            function getDefaultData(){
                var returnPromise = promise.defer();

                var httpCall = call.get('assets/data/geocodes.json');
                    httpCall.success(function(data){
                        returnPromise.resolve(data);
                    });
                    httpCall.error(function(){
                        returnPromise.resolve(false);
                    });
                return returnPromise.promise;
            }

            function getRemoteDetails(){

                var returnPromise = promise.defer();

                var httpCall = call.get(detailsUrl);
                    httpCall.success(function(data){
                        storage.setDetails(data);
                        returnPromise.resolve(data);
                    });
                    httpCall.error(function(){
                        returnPromise.resolve(false);
                    });
                return returnPromise.promise;
            }

            function getStoredDetails(){

                var returnPromise = promise.defer();

                    returnPromise.resolve( storage.getDetails() );

                return returnPromise.promise;
            }
        }

})();