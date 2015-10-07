angular.module('jogo').controller('CadHistoriaEditor',
  function($scope, $resource, $routeParams, $location, $modal, initPage, PaginacaoService, Inserts, MenuArrayService) {
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

    $scope.menus = MenuArrayService.menuPrincipal();

    $scope.subMenus = [];

    $scope.listathumb = MenuArrayService.listaFundos();

    $scope.menusOpcaoPersonagens = [];

    $scope.selecionarSubMenu = function(valor) {
      var novoThumb = [];
      if (valorMenuPrincipal.toLowerCase() == 'personagens') {
        novoThumb = MenuArrayService.listaPersonagens().filter(function(obj) {
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
      var subMenus = [];
      valorMenuPrincipal = valor;
      if (valor === 'Personagens') {
        $scope.listathumb = MenuArrayService.listaPersonagens();
        subMenus = MenuArrayService.personagemSubMenu();
      } else if (valor === 'Fundos') {
        $scope.listathumb = MenuArrayService.listaFundos();
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

    $scope.adicionarElemento = function(event) {
      $scope.historia.widthc= document.querySelector('.edicao').clientWidth;
      var elemento = $scope.elemento;
      var target = event.target;
      if (elemento.categoria === 'fundo') {
        $scope.$apply(function() {
          $scope.historia.fundo = elemento;
        });
      } else if (elemento.categoria === 'personagem') {

        $scope.elementoSelecionado = {
          nomeElemento: 'Ana Carla',
          transform:'translate(0px,0px)',
          height: 100,
          image: elemento,
          complementos: []
        };

        $scope.menusOpcaoPersonagens = MenuArrayService.personagemEdicaoMenu(elemento.tipo);

        $scope.openModalPersonagem('lg');
      }
    };

    $scope.adicionarElementoSelecionadoQuadro = function() {
      $scope.historia.elementos.push($scope.elementoSelecionado);
    };

    $scope.openModalPersonagem = function(size) {

      var modalInstance = $modal.open({
        animation: true,
        templateUrl: '/partials/cadastro/historia/modal-personagem.html',
        size: size,
        controller: 'ModalInstanceCtrl',
        resolve: {
          elemento: function() {
            return $scope;
          }
        }
      });
    };

    $scope.trocaElementoSelecionado = function(id){
      $scope.elementoSelecionado = $scope.historia.elementos[id];
    }

    $scope.mudarComplementoImagem = function(elemento) {

      var categoria = elemento.tipo ? elemento.tipo : '';
      var principal = elemento.tipo ? '' : elemento;

      if(categoria){
      $scope.elementoSelecionado.complementos = $scope.elementoSelecionado.complementos.filter(function(obj) {
        if (obj.elemento.tipo === categoria ) {
          return false;
        } else {
          return true;
        }
      });
    } else {
      $scope.elementoSelecionado.complementos = $scope.elementoSelecionado.complementos.filter(function(obj) {
        if (obj.elemento.tipoPrincipal === principal) {
          return false;
        } else {
          return true;
        }
      });
    }

      $scope.elementoSelecionado.complementos.push({
        label: categoria,
        elemento: elemento
      });
    };

  });


angular.module('jogo').controller('ModalInstanceCtrl', function($scope, $modalInstance, elemento) {

  $scope.principal = elemento;

  $scope.ok = function() {
    $scope.principal.adicionarElementoSelecionadoQuadro();
    $modalInstance.dismiss('cancel');
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});
