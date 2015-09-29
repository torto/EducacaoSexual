angular.module('jogo').controller('CadHistoriaEditor',
  function($scope, $resource, $routeParams, $location, initPage, PaginacaoService, Inserts) {
    // Contrutor ------
    // ----------------
    $scope.historia = {
      nomeQuadrinho: "Sem nome",
      fundo: null
    };

    $scope.trocarNomeQuadrinho = function(valor) {
      $scope.tituloPaginaTopo = valor;
      $scope.historia.nomeQuadrinho = valor;
    };
    // ----------------

    var init = {
      titulo: $scope.historia.nomeQuadrinho,
      menu: 'criarQuadrinho'
    };

    initPage.pageCompleta($scope, init);

    $scope.menus = [{
      link: '#',
      label: 'Fundo'
    }, {
      link: '#',
      label: 'Fundo'
    }, {
      link: '#',
      label: 'Fundo'
    }, {
      link: '#',
      label: 'Fundo'
    }, {
      link: '#',
      label: 'Fundo'
    }];
    $scope.subMenus = [];
    $scope.listathumb = [{
      label: 'Quarto',
      categoria: 'fundo',
      image: {
        "300": {
          href: '/img/300/fundos/quarto.jpg'
        }
      }
    }, {
      label: 'Festa',
      categoria: 'fundo',
      image: {
        "300": {
          href: '/img/300/fundos/festa.jpg'
        }
      }
    }, {
      label: 'Banheiro',
      categoria: 'fundo',
      image: {
        "300": {
          href: '/img/300/fundos/banheiro.jpg'
        }
      }
    }];

    $scope.elemento = null;

    $scope.mudarElemento = function(elemento){
      $scope.elemento = elemento;
    }

    $scope.adicionarElemento = function(){
      var elemento = $scope.elemento;
      if(elemento.categoria === 'fundo'){

       $scope.$apply(function () {
        $scope.historia.fundo = elemento;
      });
      } else {

      }
    }

  });
