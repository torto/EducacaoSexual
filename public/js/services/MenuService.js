angular.module('jogo').factory('MenuService',
	function() {
		return function(scope, name) {
			switch (name) {
				case 'principal':
					scope.principal = true;
					break;
					case 'criarQuadrinho':
					scope.criarQuadrinho = true;
					break;
					case 'seusQuadrinhos':
					scope.seusQuadrinhos = true;
					break;
					case 'addAluno':
					scope.addAluno = true;
					break;
					case 'seusAluno':
					scope.seusAluno = true;
					break;
				default:
					scope.principal = false;
					scope.criarQuadrinho = false;
					scope.seusQuadrinhos = false;
					scope.addAluno = false;
					scope.seusAluno = false;
					break;
			}
		};
	});