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
      var elemento = $scope.elemento;
      var target = event.target;
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

        $scope.menusOpcaoPersonagens = MenuArrayService.personagemEdicaoMenu(elemento.tipo);

        $scope.openModalPersonagem('lg');
      }
    };

    $scope.adicionarElementoSelecionadoQuadro = function(){
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

    $scope.mudarComplementoImagem = function(elemento) {

      var categoria = elemento.tipo ? elemento.tipo : elemento;

      $scope.elementoSelecionado.complementos = $scope.elementoSelecionado.complementos.filter(function(obj) {
        if (obj.elemento.tipo === categoria) {
          return false;
        } else {
          return true;
        }
      });

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
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});
