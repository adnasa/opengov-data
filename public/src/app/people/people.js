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
    data:{ pageTitle: 'What is It?' }
  });
})

.controller( 'PeopleCtrl', function PeopleCtrl( $scope, $q, peopleHttp ) {
    var vm = this;
    vm.list = [];
    vm.load = function() {
        var deferred = $q.defer();

        peopleHttp.mockGet().success(function(data, responseStatusCode, callback, responseHeaders) {
            var people = [];
            if (data) {
                var dataPeople = data.personlista;
                _.each(dataPeople.person, function(person, index, context) {
                    var personObj = {
                        firstName: person.tilltalsnamn,
                        lastName: person.efternamn,
                        sex: person.kon,
                        status: person.status,
                        thumbnail: person.bild_url_80
                    };

                    people.push(personObj);
                });
            }
            deferred.resolve(people);
        }).error(function() {
            deferred.reject();
        });
        return deferred.promise;
    };

    var activate = function() {
        return vm.load();
    };

    activate().then(function(people) {
        vm.list = people;
    })['catch'](function() {
        console.log('problem');
    })['finally'](function() {
        console.log('done');
    });
})

;
