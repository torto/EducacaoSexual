angular.module('jogo').controller('CadHistoriaEditor',['$scope', '$resource', '$routeParams', '$location', '$modal', 'initPage', 'MenuArrayService', 'ControleQuadrinho',
  function($scope, $resource, $routeParams, $location, $modal, initPage, MenuArrayService, ControleQuadrinho) {

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

    $scope.historia = ControleQuadrinho.clone(historiaLimpa);

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

    if($routeParams.id){
      buscarHistoriaById($routeParams.id);
    } else {
      $scope.listaJaCriados = [];
    }

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
    $scope.removerQuadro = function(id){
        ControleQuadrinho.removerQuadro(id, function(resp){
          console.log('removido');
        });
    };

    $scope.salvarHistoriaInteira = function(){
      ControleQuadrinho.salvarQuadrinho(null, function(resp){
        console.log(resp);
        $location.path('/meusQuadrinhos');
      });
    };

    function buscarHistoriaById(id){
      ControleQuadrinho.buscarHistoriaById(id, function(res){
        // $scope.updateExistente(0);
        carregarListaCriados();
        console.log(res);
      });
    }

    $scope.buscarHistoriaById = function(id){
      buscarHistoriaById(id);
    };

    $scope.adicionarQuadroAHistoria = function() {
      ControleQuadrinho.addQuadroHistoria($scope.historia);
    };

    $scope.mudarTelaDepoisQuadrinhoCarregado = function(){
      $scope.historia = ControleQuadrinho.clone(historiaLimpa);
      carregarListaCriados();
      // $scope.trocarNomeQuadrinho($scope.historia.nomeQuadrinho);
      atulizarTrocaDeQuadrinho();
      $scope.atualHistoria = null;
      // $route.reload();
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
        $scope.historia = ControleQuadrinho.clone(historiaLimpa);
      }
      atulizarTrocaDeQuadrinho();
    };

    var atulizarTrocaDeQuadrinho = function(){
      $scope.trocarNomeQuadrinho($scope.historia.nomeQuadrinho);
    };


  }]);


angular.module('jogo').controller('ModalInstanceCtrl',['$scope', '$modalInstance', 'elemento', function($scope, $modalInstance, elemento) {

  $scope.principal = elemento;

  $scope.ok = function() {
    $scope.principal.adicionarElementoSelecionadoQuadro();
    $modalInstance.dismiss('cancel');
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);
