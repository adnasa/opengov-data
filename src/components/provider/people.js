/**
 * @module opengov
 * @provider
 *    - peopleHttp
 */
;(function(app, undefined) {
    app.provider("peopleHttp", function PeopleHttpProvider() {
        var _endpoint = null;

        /**
         * Setter for an endpoint
         * @param string endpoint
         * @return this
         */
        this.setEndpoint = function(endpoint) {
            _endpoint = endpoint;
            return this;
        };

        var _get = function(params) {
            console.log(_endpoint);
        };

        var _mockGet = function($http) {
            var params = {
                'parti': 'S',
                'utformat': 'json'
            };

            return $http({
                url: _endpoint,
                params: params
            });
        };

        this.$get = function($http) {
            return {
                get: (function() {
                    return function(params) {
                        return _get(params, $http);
                    };
                })(),
                mockGet: (function() {
                    return function() {
                        return _mockGet($http);
                    };
                })()
            };
        };
    });
})(angular.module('opengov', []));
