(function () {
	"use strict";

	angular.module("gto.home")
	.controller("HomeController", [
		"$scope",
		function ($scope) {
			(function _init() {
				$(document).ready(function(){
	                JBCountDown({
	                    secondsColor : "#d64239",
	                    secondsGlow  : "none",

	                    minutesColor : "#d64239",
	                    minutesGlow  : "none",

	                    hoursColor   : "#d64239",
	                    hoursGlow    : "none",

	                    daysColor    : "#d64239",
	                    daysGlow     : "none",

	                    startDate   : new Date("30 August 2016 12:00:00").getTime() / 1000,
	                    endDate     : new Date("11 September 2016 12:00:00").getTime() / 1000,
	                    now         : new Date().getTime() / 1000,
	                });
	            });
			})();
		}
	]);
})();
