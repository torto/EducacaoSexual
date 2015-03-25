angular.module('jogo').factory('PaginacaoService',
	function() {
//{array: array de todas as imagens,
// imageTrocar: imagem do quadro maior,
// arrayQuadros: array das imagens pequenas
// } 


		function retorno(scope, json) {

			var contadorPaginacao = 1;
			var contadorMax = 0;

			scope.mudarImagem = function(image) {
				scope[json.imageTrocar] = image;
			}

			scope.avancarPaginacao = function() {
				var maxIf = contadorMax | 0
				if (contadorPaginacao !== maxIf) {
					contadorPaginacao++;
					carregarProximos();
				} else {
					console.log('não entrou diabeira!');
				}
			}

			scope.retrocederPaginacao = function() {
				if (contadorPaginacao > 1) {
					contadorPaginacao--;
					carregarProximos();
				}
			}

			var carregarProximos = function() {
				var tamanhoImagens = scope[json.array].length;

				contadorMax = tamanhoImagens / 4;

				if (tamanhoImagens % 4 != 0) {
					contadorMax++;
				}

				var i = (contadorPaginacao * 4) - 4;
				var max = i + 4;

				if (max >= tamanhoImagens) {
					max = tamanhoImagens;
				}

				scope[json.arrayQuadros] = [];

				for (i; i < max; i++) {
					scope[json.arrayQuadros].push(scope[json.array][i]);
				};
			};

			carregarProximos();
		};

		return {
			quadroSelecaoPadrao: retorno
		};
	});