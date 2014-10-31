angular.module('Eureka.calldetail.services')
    .factory('calldetail.service', [
            '$http', '$q', '$rootScope', 'call.repository',
    function ($http, $q, $rootScope, callRepository) {
        var service = {
            CallTranscript: getTranscript,
        }

        // Gets the transcript for a call
        function getTranscript(callId, searchGuid) {
            var deferred = $q.defer();
            callRepository.getTranscript().getTranscript( { callid: callId, searchguid: searchGuid },
                function (data) {
                    deferred.resolve(data);
                },
                function (response) {
                    deferred.reject(response);
                }
            );
            return deferred.promise;
        }

        return service;
    }]);