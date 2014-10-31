(function () {
    angular.module('Eureka.call.repositories')
        .factory('call.repository', [
            '$resource', '$rootScope', '$q', '$http', CallRepositoryFactory
        ]);

    function CallRepositoryFactory($resource, $rootScope, $q, $http) {
        return {
            getMetadata: function () {
                return $resource($rootScope.API_ADDRESS + '/calls/:callid/metadata',
                    { callid: '@callid' },
                    { 'query': { method: 'GET', isArray: true } }
                );
            },
            getTranscript: function () {
                return $resource($rootScope.API_ADDRESS + '/search/transcript/:callid/:searchguid',
                    { callid: '@callid', searchguid: '@searchguid' },
                    { 'getTranscript': { method: 'GET', isArray: true } }
                );
            }
        }
    }
})();