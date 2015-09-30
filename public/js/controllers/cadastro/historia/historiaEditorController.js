angular.module('jogo').controller('CadHistoriaEditor',
  function($scope, $resource, $routeParams, $location, $modal, initPage, PaginacaoService, Inserts) {
    // Contrutor ------
    var valorMenuPrincipal = 'Fundos';

    $scope.tituloQuadro = {
      templateUrl: '/partials/cadastro/historia/editName.html',
    };

    // ----------------
    var pessoa = {
      nomeElemento: 'Ana Carla',
      x: 0,
      y: 0,
      image: {
        label: 'Adolescente',
        categoria: 'personagem',
        subcategoria: 'masculino',
        image: {
          "300": {
            href: '/img/300/personagens/homem/corpo/adolescente.png'
          }
        }
      },
      complementos: []
    };


    var fundo = [{
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

    var personagem = [{
      label: 'Adolescente',
      categoria: 'personagem',
      subcategoria: 'masculino',
      image: {
        "300": {
          href: '/img/300/personagens/homem/corpo/adolescente.png'
        }
      }
    }, {
      label: 'Criança',
      categoria: 'personagem',
      subcategoria: 'masculino',
      image: {
        "300": {
          href: '/img/300/personagens/homem/corpo/crianca.png'
        }
      }
    }];

    $scope.historia = {
      nomeQuadrinho: "Sem nome",
      fundo: null,
      elementos: []
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
      link: '',
      label: 'Fundos'
    }, {
      link: '#',
      label: 'Personagens'
    }];

    var subMenus = [{
      label: 'Personagens',
      menus: [{
        label: 'Masculino',
        link: '#'
      }, {
        label: 'Feminino',
        link: '#'
      }]
    }];

    $scope.subMenus = [];

    $scope.listathumb = fundo;

    $scope.selecionarSubMenu = function(valor) {
      var novoThumb = [];
      if (valorMenuPrincipal.toLowerCase() == 'personagens') {
        novoThumb = personagem.filter(function(obj) {
          var retorno = false;
          if (obj.subcategoria) {
            if (obj.subcategoria.toLowerCase() === valor.label.toLowerCase()) {
              retorno = true;
            }
          }

          return retorno;
        });
      }


      $scope.listathumb = novoThumb;
    };

    $scope.alterarSubMenu = function(valor) {
      valorMenuPrincipal = valor;
      if (valor === 'Personagens') {
        $scope.listathumb = personagem;
      } else if (valor === 'Fundos') {
        $scope.listathumb = fundo;
      }

      var novoMenu = subMenus.filter(function(obj) {
        if (obj.label === valor) {
          return true;
        } else {
          return false;
        }
      });
      $scope.subMenus = novoMenu;
    };


    $scope.elemento = null;

    $scope.mudarElemento = function(elemento) {
      $scope.elemento = elemento;
    };

    $scope.adicionarElemento = function() {
      var elemento = $scope.elemento;
      if (elemento.categoria === 'fundo') {
        $scope.$apply(function() {
          $scope.historia.fundo = elemento;
        });
      } else if (elemento.categoria === 'personagem') {

        $scope.elementoSelecionado = {
          nomeElemento: 'Ana Carla',
          x: 0,
          y: 0,
          image: elemento,
          complementos: []
        };

        $scope.openModalPersonagem('lg');
      }
    };


    $scope.openModalPersonagem = function(size) {

      var modalInstance = $modal.open({
        animation: true,
        templateUrl: '/partials/cadastro/historia/modal-personagem.html',
        size: size,
        controller: 'ModalInstanceCtrl',
        resolve: {
          elemento: function() {
            return $scope.elementoSelecionado;
          }
        }
      });
    };

  });

angular.module('jogo').controller('ModalInstanceCtrl', function($scope, $modalInstance, elemento) {

    $scope.elementoSelecionado = elemento;

  $scope.ok = function() {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});
