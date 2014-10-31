(function () {
angular.module('ReponseInterceptors', ['ngCookies'])
    .factory('httpResponseInterceptor', ['$q', '$window', '$log', '$cookies', ResponseInterceptor]);

function ResponseInterceptor ($q, $window, $log, $cookies) {
    return {
        'request': function (config) {
            // append token in every request
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'JWT ' + $window.sessionStorage.token;
            }
            return config;
        },
        'response': function (response) {
            // On successful response from api, look for updated token
            if (response.headers('auth-token-updated')) {
                $window.sessionStorage.token = response.headers('auth-token-updated');

                // note: this is using jquery cookie
                $.cookie('JwtCookie', response.headers('auth-token-updated'), { path: '/' });
            }
            return response || $q.when(response);
        },
        'responseError': function (rejection) {
                if (rejection != null && rejection.status === 401 && $window.sessionStorage.token) {
                $log.info('unauthorized request');
                delete $window.sessionStorage.token;
                $.removeCookie('JwtCookie', { path: '/' });
                $window.location.reload(true);
            }
            return $q.reject(rejection);
        }
    };
}
})();