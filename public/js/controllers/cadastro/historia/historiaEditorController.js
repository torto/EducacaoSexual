angular.module('jogo').controller('CadHistoriaEditor',
  function($scope, $resource, $routeParams, $location, $modal, $rootScope, initPage, PaginacaoService, Inserts, MenuArrayService, ControleQuadrinho) {
    $rootScope.clone = function clone(obj) {
      var copy;

      // Handle the 3 simple types, and null or undefined
      if (null === obj || "object" != typeof obj) return obj;
      // Handle Date
      if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
      }

      // Handle Array
      if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
          copy[i] = clone(obj[i]);
        }
        return copy;
      }

      // Handle Object
      if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
      }

      throw new Error("Unable to copy obj! Its type isn't supported.");
    };

    $scope.listaJaCriados = ControleQuadrinho.getListQuadros();

    // Contrutor ------
    var valorMenuPrincipal = 'Fundos';
    $scope.tituloQuadro = {
      templateUrl: '/partials/cadastro/historia/editName.html',
      aberto: false
    };

    // ---------------
    var historiaLimpa = {
      nomeQuadrinho: "Sem nome",
      fundo: null,
      elementos: []
    };

    $scope.historia = $rootScope.clone(historiaLimpa);

    $scope.trocarNomeQuadrinho = function(valor) {
      $scope.tituloPaginaTopo = valor;
      $scope.historia.nomeQuadrinho = valor;
      $scope.tituloQuadro.aberto = false;
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
      $scope.historia.widthc = document.querySelector('.edicao').clientWidth;
      var elemento = $scope.elemento;
      var target = event.target;
      if (elemento.categoria === 'fundo') {
        $scope.$apply(function() {
          $scope.historia.fundo = elemento;
        });
      } else if (elemento.categoria === 'personagem') {

        $scope.elementoSelecionado = {
          nomeElemento: '',
          transform: 'translate(0px,0px)',
          height: 100,
          image: elemento,
          complementos: []
        };

        $scope.menusOpcaoPersonagens = MenuArrayService.personagemEdicaoMenu(elemento.tipo);

        $scope.openModalPersonagem('lg');
      }
    };

    $scope.editarElemento = function(elemento){
      $scope.elementoSelecionado = $scope.historia.elementos[elemento];
      $scope.elementoSelecionado.index = elemento;
      if ($scope.elementoSelecionado.image.categoria === 'personagem') {
        $scope.menusOpcaoPersonagens = MenuArrayService.personagemEdicaoMenu($scope.elementoSelecionado.image.tipo);
        $scope.openModalPersonagem('lg');
      }
    };

    $scope.adicionarElementoSelecionadoQuadro = function() {
      if($scope.elementoSelecionado.index >= 0){
        var index = $scope.elementoSelecionado.index;
        delete $scope.elementoSelecionado.index;
        $scope.historia.elementos[index] = $scope.elementoSelecionado;
      } else {
        $scope.historia.elementos.push($scope.elementoSelecionado);
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
            return $scope;
          }
        }
      });
    };

    $scope.mudarComplementoImagem = function(elemento) {

      var categoria = elemento.tipo ? elemento.tipo : '';
      var principal = elemento.tipo ? '' : elemento;

      if (categoria) {
        $scope.elementoSelecionado.complementos = $scope.elementoSelecionado.complementos.filter(function(obj) {
          if (obj.elemento.tipo === categoria) {
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

    $scope.templateObjeto = '';

    $scope.selecionarTemplateSelecao = function(valor) {
      var template = '/partials/cadastro/historia/templates/';
      if (valor == 'crianca') {
        $scope.templateObjeto = template + 'personagem-padrao.html';
      }
    };


    //METODOS DE EXECUCAO -------------------------


    $scope.adicionarQuadroAHistoria = function() {
      ControleQuadrinho.addQuadroHistoria($scope.historia);
      $scope.historia = $rootScope.clone(historiaLimpa);
      carregarListaCriados();
      // $scope.trocarNomeQuadrinho($scope.historia.nomeQuadrinho);
      atulizarTrocaDeQuadrinho();
      $scope.atualHistoria = null;
    };

    $scope.updateExistente = function(id) {
      $scope.historia = ControleQuadrinho.getQuadroByPosicao(id);
      atulizarTrocaDeQuadrinho();
    };

    var carregarListaCriados = function() {
      $scope.listaJaCriados = ControleQuadrinho.getListQuadros();
      atulizarTrocaDeQuadrinho();
    };
    $scope.atualHistoria = null;
    $scope.mudarQuadrinhoCriado = function(valor) {
      if (valor) {
        $scope.historia = valor;
      } else {
        $scope.historia = $rootScope.clone(historiaLimpa);
      }
      atulizarTrocaDeQuadrinho();
    };

    var atulizarTrocaDeQuadrinho = function(){
      $scope.trocarNomeQuadrinho($scope.historia.nomeQuadrinho);

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
