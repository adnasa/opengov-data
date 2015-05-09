angular.module( 'ngBoilerplate.people', [
    'ui.router',
    'placeholders',
    'ui.bootstrap',
    'opengov'
])

.config(function config( $stateProvider, peopleHttpProvider ) {
    peopleHttpProvider.setEndpoint('http://data.riksdagen.se/personlista/');
    $stateProvider.state( 'people', {
        url: '/people',
        views: {
            "main": {
                controller: 'PeopleCtrl',
                controllerAs: 'people',
                templateUrl: 'people/people.tpl.html'
            }
        },
        data:{ pageTitle: 'People' }
    });
})

.controller( 'PeopleCtrl', function PeopleCtrl( $scope, $q, peopleHttp, partyList ) {
    var vm = this;
    vm.list = [];
    vm.filter = {};
    vm.partyList = partyList;

    console.log(vm, partyList);

    vm.load = function(params) {
        var deferred = $q.defer();
        var mapPerson = function(person) {
            return {
                firstName: person.tilltalsnamn,
                lastName: person.efternamn,
                sex: person.kon,
                status: person.status,
                thumbnail: person.bild_url_80,
                party: person.parti
            };
        };

        if (params === undefined) {
            params = {
                'termlista': 'parti',
                'kn': 'kvinna'
            };
        }

        peopleHttp.get(params).success(function(data, responseStatusCode, callback, responseHeaders) {
            var people = [];
            if (data) {
                var dataPeople = data.personlista;
                if (angular.isArray(dataPeople.person)) {
                    _.each(dataPeople.person, function(person, index, context) {
                        people.push(mapPerson(person));
                    });
                } else {
                    people.push(mapPerson(dataPeople.person));
                }
            }
            deferred.resolve(people);
        }).error(function() {
            deferred.reject();
        });

        return deferred.promise;
    };

    vm.reload = function(params) {
        vm.list = [];
        vm.load(params).then(function(people) {
            vm.list = people;
        });
    };


    var activate = function() {
        return vm.load();
    };

    activate().then(function(people) {
        vm.list = people;
    })['catch'](function() {

    })['finally'](function() {

    });
});
