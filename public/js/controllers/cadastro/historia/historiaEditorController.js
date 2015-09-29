angular.module('jogo').controller('CadHistoriaEditor',
  function($scope, $resource, $routeParams, $location, initPage, PaginacaoService, Inserts) {
    // Contrutor ------
    // ----------------
    $scope.historia = {
      nomeQuadrinho: "Sem nome"
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
      image: {
        "300": {
          href: '/img/300/fundos/quarto.jpg'
        }
      }
    }, {
      label: 'Festa',
      image: {
        "300": {
          href: '/img/300/fundos/festa.jpg'
        }
      }
    }, {
      label: 'Banheiro',
      image: {
        "300": {
          href: '/img/300/fundos/banheiro.jpg'
        }
      }
    }];




  });
