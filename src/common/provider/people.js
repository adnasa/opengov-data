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

        var _get = function(params, $http) {
            params.utformat = 'json';
            return $http({
                url: _endpoint,
                params: params
            });
        };

        var _mockGet = function($http) {
            var params = {
                'termlista': 'parti',
                'utformat': 'json',
                'kn': 'kvinna'
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
