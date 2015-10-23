angular.module('jogo').factory('MenuArrayService', ['ResourceBancoMenu', function(ResourceBancoMenu) {

  var menuPrincipal = [];
  var personagemSubMenu =[];

  var listaPersonagens = [];
  var listaPersonagensCompleto = [];
  var listaFundos = [];
  var listaObjetos = [];

  var personagemEdicao = [];

  var retorno = {
    menuPrincipal: function(callback) {

      return [{
        link: '',
        label: 'Fundos'
      }, {
        link: '',
        label: 'Personagens'
      },
      {
        link:'',
        label:'Objetos'
      }];
    },
    listaPersonagens: function(callback) {
      if(listaPersonagens.length === 0){
      ResourceBancoMenu.personagens.query(function(res){
        listaPersonagens = res;
        callback(res);
      });
    } else {
      callback(listaPersonagens);
    }
      // return [{
      //   id: 1,
      //   label: 'Adolescente',
      //   categoria: 'personagem',
      //   subcategoria: 'masculino',
      //   tipo:'adolescente',
      //   image: {
      //     "300": {
      //       href: '/img/300/personagens/homem/corpo/adolescente.png'
      //     }
      //   }
      // }, {
      //   id: 2,
      //   label: 'Criança',
      //   tipo: 'crianca',
      //   categoria: 'personagem',
      //   subcategoria: 'masculino',
      //   image: {
      //     "300": {
      //       href: '/img/300/personagens/homem/corpo/crianca.png'
      //     }
      //   }
      // }];
    },
    listaFundos: function(callback) {
      if(listaFundos.length === 0){
      ResourceBancoMenu.fundo.query(function(res){
        listaFundos = res;
        callback(res);
      });
    } else {
      callback(listaFundos);
    }
      // return [{
      //   id: 3,
      //   label: 'Quarto',
      //   categoria: 'fundo',
      //   image: {
      //     "300": {
      //       href: '/img/300/fundos/quarto.jpg'
      //     },
      //     "800": {
      //       href: '/img/800/fundos/quarto.jpg'
      //     }
      //   }
      // }, {
      //   id: 4,
      //   label: 'Festa',
      //   categoria: 'fundo',
      //   image: {
      //     "300": {
      //       href: '/img/300/fundos/festa.jpg'
      //     },
      //     "800": {
      //       href: '/img/800/fundos/festa.jpg'
      //     }
      //   }
      // }, {
      //   id: 5,
      //   label: 'Banheiro',
      //   categoria: 'fundo',
      //   image: {
      //     "300": {
      //       href: '/img/300/fundos/banheiro.jpg'
      //     },
      //     "800": {
      //       href: '/img/800/fundos/banheiro.jpg'
      //     }
      //   }
      // }];
    },
    listaObjetos: function(callback) {
      var retorno = [{
        id: 3,
        label: 'Balão Fala',
        categoria: 'objeto',
        image: {
          "300": {
            href: '/img/300/fundos/quarto.jpg'
          },
          "thumb": {
            href: '/img/800/fundos/quarto.jpg'
          }
        }
      }];
      callback(retorno);
    },
    personagemSubMenu: function() {
      return [{
        label: 'Personagens',
        menus: [{
          label: 'Masculino',
          link: '#'
        }, {
          label: 'Feminino',
          link: '#'
        }]
      }];
    },
    personagemEdicaoMenu: function(valorPesquisa, callback) {
      if(listaPersonagensCompleto.length === 0){
      ResourceBancoMenu.personagensCompleto.query(function(res){
        listaPersonagensCompleto = res;
        callback(res.filter(function(obj){
          if(valorPesquisa === obj.personagem){
            return true;
          } else {
            return false;
          }
        }));
      });
    } else {
      callback(listaPersonagensCompleto.filter(function(obj){
        if(valorPesquisa === obj.personagem){
          return true;
        } else {
          return false;
        }
      }));
    }


    //   return [{
    //     label: "Feições",
    //     tipo: 'feicao',
    //     categoria: 'personagem',
    //     subcategoria: "masculino",
    //     personagem: 'crianca',
    //     elementos: [{
    //       id: 10,
    //       label: 'Chorando',
    //       categoria: 'personagem',
    //       subcategoria: 'masculino',
    //       tipoPrincipal: 'feicao',
    //       tipo: 'feicao',
    //       personagem: 'crianca',
    //       image: {
    //         300: {
    //           href: '/img/300/personagens/homem/feicao/crianca/chorando.png'
    //         },
    //         thumb: {
    //           href: '/img/thumb/personagens/homem/feicao/crianca/chorando.png'
    //         }
    //       }
    //     }, {
    //       label: 'Assustado',
    //       categoria: 'personagem',
    //       subcategoria: 'masculino',
    //       tipoPrincipal: 'feicao',
    //       tipo: 'feicao',
    //       personagem: 'crianca',
    //       image: {
    //         300: {
    //           href: '/img/300/personagens/homem/feicao/crianca/assustado.png'
    //         },
    //         thumb: {
    //           href: '/img/thumb/personagens/homem/feicao/crianca/assustado.png'
    //         }
    //       }
    //     }, {
    //       label: 'Bravo',
    //       categoria: 'personagem',
    //       subcategoria: 'masculino',
    //       tipoPrincipal: 'feicao',
    //       tipo: 'feicao',
    //       personagem: 'crianca',
    //       image: {
    //         300: {
    //           href: '/img/300/personagens/homem/feicao/crianca/bravo.png'
    //         },
    //         thumb: {
    //           href: '/img/thumb/personagens/homem/feicao/crianca/bravo.png'
    //         }
    //       }
    //     }, {
    //       label: 'Envergonhado',
    //       categoria: 'personagem',
    //       subcategoria: 'masculino',
    //       tipoPrincipal: 'feicao',
    //       tipo: 'feicao',
    //       personagem: 'crianca',
    //       image: {
    //         300: {
    //           href: '/img/300/personagens/homem/feicao/crianca/envergonhado.png'
    //         },
    //         thumb: {
    //           href: '/img/thumb/personagens/homem/feicao/crianca/envergonhado.png'
    //         }
    //       }
    //     }, {
    //       label: 'Feliz',
    //       categoria: 'personagem',
    //       subcategoria: 'masculino',
    //       tipoPrincipal: 'feicao',
    //       tipo: 'feicao',
    //       personagem: 'crianca',
    //       image: {
    //         300: {
    //           href: '/img/300/personagens/homem/feicao/crianca/feliz.png'
    //         },
    //         thumb: {
    //           href: '/img/thumb/personagens/homem/feicao/crianca/feliz.png'
    //         }
    //       }
    //     }, {
    //       label: 'Triste',
    //       categoria: 'personagem',
    //       subcategoria: 'masculino',
    //       tipoPrincipal: 'feicao',
    //       tipo: 'feicao',
    //       personagem: 'crianca',
    //       image: {
    //         300: {
    //           href: '/img/300/personagens/homem/feicao/crianca/triste.png'
    //         },
    //         thumb: {
    //           href: '/img/thumb/personagens/homem/feicao/crianca/triste.png'
    //         }
    //       }
    //     }]
    //   }, {
    //     label: "Cabelo",
    //     categoria: 'personagem',
    //     subcategoria: "masculino",
    //     tipo: 'cabelo',
    //     personagem: 'crianca',
    //     elementos: [{
    //       label: 'Enrolado - Curto',
    //       categoria: 'personagem',
    //       subcategoria: 'masculino',
    //       personagem: 'crianca',
    //       tipoPrincipal: 'cabelo',
    //       tipo: 'cabelo',
    //       image: {
    //         300: {
    //           href: '/img/300/personagens/homem/cabelo/crianca/enrolado-curto.png'
    //         },
    //         thumb: {
    //           href: '/img/thumb/personagens/homem/cabelo/crianca/enrolado-curto.png'
    //         }
    //       }
    //     }, {
    //       label: 'Enrolado - Grande',
    //       categoria: 'personagem',
    //       subcategoria: 'masculino',
    //       personagem: 'crianca',
    //       tipoPrincipal: 'cabelo',
    //       tipo: 'cabelo',
    //       image: {
    //         300: {
    //           href: '/img/300/personagens/homem/cabelo/crianca/enrolado-grande.png'
    //         },
    //         thumb: {
    //           href: '/img/thumb/personagens/homem/cabelo/crianca/enrolado-grande.png'
    //         }
    //       }
    //     }]
    //   },
    //   {
    //     label: "Roupas",
    //     categoria: 'personagem',
    //     subcategoria: "masculino",
    //     tipo: 'roupa',
    //     personagem: 'crianca',
    //     elementos: [{
    //       label: 'Calça',
    //       categoria: 'personagem',
    //       subcategoria: 'masculino',
    //       personagem: 'crianca',
    //       tipoPrincipal: 'roupa',
    //       tipo: 'calca',
    //       image: {
    //         300: {
    //           href: '/img/300/personagens/homem/roupa/crianca/calca.png'
    //         },
    //         thumb: {
    //           href: '/img/thumb/personagens/homem/roupa/crianca/calca.png'
    //         }
    //       }
    //     }, {
    //       label: 'Shorts',
    //       categoria: 'personagem',
    //       subcategoria: 'masculino',
    //       personagem: 'crianca',
    //       tipoPrincipal: 'roupa',
    //       tipo: 'calca',
    //       image: {
    //         300: {
    //           href: '/img/300/personagens/homem/roupa/crianca/shorts.png'
    //         },
    //         thumb: {
    //           href: '/img/thumb/personagens/homem/roupa/crianca/shorts.png'
    //         }
    //       }
    //     },
    //   {
    //     label: 'Camiseta',
    //     categoria: 'personagem',
    //     subcategoria: 'masculino',
    //     personagem: 'crianca',
    //     tipoPrincipal: 'roupa',
    //     tipo: 'camiseta',
    //     image: {
    //       300: {
    //         href: '/img/300/personagens/homem/roupa/crianca/camiseta.png'
    //       },
    //       thumb: {
    //         href: '/img/thumb/personagens/homem/roupa/crianca/camiseta.png'
    //       }
    //     }
    //   }]
    //   }
    // ].filter(function(obj){
    //   if(valorPesquisa === obj.personagem){
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });
    }
  };

  return retorno;
}]);
