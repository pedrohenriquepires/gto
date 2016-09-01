(function () {
	"use strict";

	angular.module("gto.home")
	.controller("HomeController", [
		"$scope",
		function ($scope) {
			(function _init() {
				$(document).ready(function(){
					$('body').mousemove(function(e) {
						var offset = $(this).offset();
						var relativeX = (e.pageX - offset.left);
						var relativeY = (e.pageY - offset.top);

						var offsetX = ($(this).width() / 2) - relativeX;
						var offsetY = ($(this).height() / 2) - relativeY;

						$(this).css({
							queue: false,
							perspective: '1000px',
							rotateY: -offsetX / ($(this).width()/2),
							rotateX: offsetY / ($(this).height()/2),
							scale: (1.0)
						});
					});

					$('body').mouseleave(function(e) {
						$(this).transition({
							rotateY: 0,
							rotateX: 0,
							scale: (1)
						});
					});

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
