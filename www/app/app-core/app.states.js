(function () {
	"use strict";

	angular.module("gto.core")
	.config([
		"$locationProvider",
		"$stateProvider",
		"$urlRouterProvider",
		function($locationProvider, $stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise("/");

			$stateProvider
				.state('root', {
					url: '',
					abstract: true,
					template: '<div ui-view></div>',
					data: {
						isPublic: false
					}
				})
				.state("root.home", {
					url: "/",
					templateUrl: "app/app-modules/home/home.html",
					controller: "HomeController"
				});

			$locationProvider.html5Mode({
				enabled: false,
				requireBase: false
			});
		}
	]);
})();
