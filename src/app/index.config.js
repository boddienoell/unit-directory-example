(function() {
  'use strict';

  angular
    .module('bneIntranet2')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastr, $mdThemingProvider, $compileProvider) {

    //allow for maps: prefix for urls..
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|maps):/);

    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastr.options.timeOut = 3000;
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = true;

    $mdThemingProvider.theme('default').primaryPalette('indigo');

  }

})();
