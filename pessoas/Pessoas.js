var pessoas = angular.module('Pessoas', ['ngRoute','ngResource']);

pessoas
	.config(
		[
			'$routeProvider',
				function($routeProvider) {
					$routeProvider
						.when('/',{
							templateUrl: 'pessoas/templates/index.html'
						})
						.when('/adicionar', {
							templateUrl: 'pessoas/templates/adicionar.html'
						})
						.when('/editar/:id', {
							templateUrl: 'pessoas/templates/editar.html'
						})
						.when('/teste', {
							templateUrl: '/pessoas/teste/index.html'
						})
					;
				}
		]
	); 