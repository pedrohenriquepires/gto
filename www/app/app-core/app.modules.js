(function(){
	"use strict";

	angular.module("gto.core", [
		"ui.router"
	]);

	angular.module("gto.home", []);

	angular.module("gto", [
		"gto.core",
		"gto.home",
	]);
})();
