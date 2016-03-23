angular.module('pessoas', [])
.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'listar.html',
			controller: 'CtrlRemover'
		})
		// .when('/:index', {
		// 	controller: 'CtrlRemover'
		// })
		.when('/pessoa/adicionar', {
			templateUrl: 'adicionar.html',
			controller: 'CtrlAdicionar'
		})
		.when('/pessoa/:index', {
			templateUrl: 'editar.html',
			controller: 'CtrlEditar'
		})

		;	
})
.controller('CtrlPessoa', ['$scope', function(s){
	s.pessoas = [
		{nome: "Bruno", cidade: "São Paulo"},
		{nome: "Bruno 2", cidade: "São Paulo 2"},
		{nome: "Bruno 3", cidade: "São Paulo 3"},
		{nome: "Bruno 4", cidade: "São Paulo 4"},
		{nome: "Bruno 5", cidade: "São Paulo 5"}
	];	
}])
.controller('CtrlAdicionar', function($scope){
	$scope.add = function(){
		// $scope.pessoas.push({
		// 	nome: $scope.pessoa.nome,
		// 	cidade: $scope.pessoa.cidade
		// });
		
		$scope.pessoas.push($scope.pessoa);
		//console.log($scope.pessoas);

		// $scope.pessoa.nome = "";
		// $scope.pessoa.cidade = "";

		// objeto pessoa
		$scope.pessoa = "";
		$scope.result = "Registro adicionado com sucesso!";
	};
})
.controller('CtrlEditar', function($scope, $routeParams){
	$scope.pessoa = $scope.pessoas[$routeParams.index];
})
.controller('CtrlRemover', function($scope, $routeParams){ // nao funcionou
	console.log('scope '+$scope);
	console.log('routeParams '+$routeParams.index);
	$scope.remover = function($routeParams){
		console.log('remover '+$routeParams);

		//console.log('delete');return;
		//$scope.pessoas.remove($scope.pessoa);
		//$scope.pessoas.splice($scope.pessoa, 1);
		
		//$scope.pessoas.splice($scope.pessoas[$routeParams.index]);
		
		//$scope.pessoa = $scope.pessoas[$routeParams.index];
	}
})

;