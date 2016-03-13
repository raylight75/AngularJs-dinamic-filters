/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
    function ($scope, Phone) {
        /*$http.get('phones/phones.json').success(function (data) {
         $scope.phones = data;
         console.log($scope.phones);
         });*/
        $scope.phones = Phone.query();
        $scope.nameIncludes = [];

        $scope.includeName = function (name) {
            var i = $.inArray(name, $scope.nameIncludes);
            if (i > -1) {
                $scope.nameIncludes.splice(i, 1);
            } else {
                $scope.nameIncludes.push(name);
            }
            console.log($scope.nameIncludes);
        }

        $scope.nameFilter = function (phones) {
            if ($scope.nameIncludes.length > 0) {
                if ($.inArray(phones.slug, $scope.nameIncludes) < 0)
                    if ($.inArray(phones.carrier, $scope.nameIncludes) < 0)
                        return;
            }
            return phones;
        }
        $scope.orderProp = 'age';
    }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
    function ($scope, $routeParams, Phone) {
        $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function (phone) {
            $scope.mainImageUrl = phone.images[0];
        });
        $scope.setImage = function (imageUrl) {
            $scope.mainImageUrl = imageUrl;
        };
    }]);
