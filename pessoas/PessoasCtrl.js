pessoas
	.controller('PessoasCtrl', 
		['$scope', 'PessoasSrv', '$location', '$routeParams',
			function($scope, PessoasSrv, $location, $routeParams){
				$scope.load = function(){
					$scope.registros = PessoasSrv.query();
				}

				$scope.clear = function(){
					$scope.item = "";
				}

				$scope.add = function(item){
					$scope.result = PessoasSrv.save(
						{},
						$jQuery.param(item),
						function(data, status, headers, config){
							$location.path('/');
						},
						function(data, status, headers, config){
							alert('Ocorreu um erro: '+data.messages[0]);
						}
					);
				}

				$scope.get = function(){
					$scope.item = PessoasSrv.get({id: $routeParams.id})
				}

				$scope.editar = function(item){
					//var param = $jQuery.param(item);
					var param = $jQuery.param(JSON.parse(angular.toJson(item)));
					//console.log(param);return;
					$scope.result = PessoasSrv.update(
						{id: $routeParams.id},
						param,
						function(data, status, headers, config){
							$location.path('/');
						},
						function(data, status, headers, config){
							alert('Ocorreu um erro: '+data.messages[0]);
						}
					);
				}

				$scope.delete = function(id){
					if(confirm('Deseja realmente excluir o registro '+id)){
						PessoasSrv.remove(
							{id: id},
							{},
							function(data, status, headers, config){
								// $location.path('/');
								$scope.load();
							},
							function(data, status, headers, config){
								alert('Ocorreu um erro: '+data.messages[0]);
							}
						)
					}else{
						$scope.load();
					}
				}
			}
		]
	);