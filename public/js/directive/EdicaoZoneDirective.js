angular.module('jogo').directive('edicao', function() {
  return {
    restrict: 'C',
    link: function(scope, elem, attrs) {
      var BAIXO = 40,
        CIMA = 38,
        ESQUERDA = 37,
        DIREITA = 39,
        DELETE = 46;

      $(elem).on('keydown', '.resize', function(event) {
        var elemento = $(this);
        var posicao = elemento.data('posicao');
        var transform = scope.historia.elementos[posicao].transform;
        var arrayValTemp = transform.split('translate(')[1].split(',');
        var top = parseFloat(arrayValTemp[1].replace("px)", ""));
        var lado = parseFloat(arrayValTemp[0].replace("px", ""));

        if (event.keyCode === DELETE) {
          scope.$apply(function() {
            scope.historia.elementos.splice(posicao, 1);
          });
        } else if (event.keyCode === BAIXO) {
          scope.$apply(function() {
            top++;
            if (top >= 0) {
              scope.historia.elementos[posicao].transform = 'translate(' + lado + 'px, ' + top + 'px)';
            }
          });
          event.preventDefault();
        } else if (event.keyCode === CIMA) {
          scope.$apply(function() {
            top--;
            if (top >= 0) {
              scope.historia.elementos[posicao].transform = 'translate(' + lado + 'px, ' + top + 'px)';
            } else {
              top = 0;
            }
          });
          event.preventDefault();
        } else if (event.keyCode == DIREITA) {
          scope.$apply(function() {
            lado++;
            if (lado >= 0) {
              scope.historia.elementos[posicao].transform = 'translate(' + lado + 'px, ' + top + 'px)';
            } else {
              lado = 0;
            }
          });
          event.preventDefault();
        } else if (event.keyCode === ESQUERDA) {
          scope.$apply(function() {
            lado--;
            if (lado >= 0) {
              scope.historia.elementos[posicao].transform = 'translate(' + lado + 'px, ' + top + 'px)';
            } else {
              lado = 0;
            }
          });
          event.preventDefault();
        }
      });


      $(".selecao-click").on('click', function(e) {
        $('.elemento-edicao').each(function(i, obj) {
          $(obj).addClass('sumir');
          $(obj).blur();
        });
      });

      $(elem).on('click', '.resize', function(e) {
        $('.elemento-edicao').each(function(i, obj) {
          $(obj).addClass('sumir');
          $(obj).blur();
        });
        $(this).focus();

        $(this).find('.elemento-edicao').removeClass('sumir');

      });

      $(elem).on('click', '.popover', function(e) {
        $(this).focus();

      });


      // target elements with the "draggable" class
      interact('.draggable')
        .draggable({
          // enable inertial throwing
          inertia: true,
          // keep the element within the area of it's parent
          restrict: {
            restriction: ".itens-thumb .edicao",
            endOnly: true,
            elementRect: {
              top: 0,
              left: 0,
              bottom: 1,
              right: 1
            }
          },

          // call this function on every dragmove event
          onmove: dragMoveListener,
          // call this function on every dragend event
          onend: function(event) {
            var target = event.target;

            target.setAttribute('data-pass-x', event.dx);
            target.setAttribute('data-pass-y', event.dy);

            target.classList.add('draggable-back');
            target.setAttribute('data-x', 0);
            target.setAttribute('data-y', 0);

            target.style.webkitTransform =
              target.style.transform =
              null;
          }
        });

      function dragMoveListener(event) {
        var target = event.target,
          // keep the dragged position in the data-x/data-y attributes
          x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
          y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
          target.style.transform =
          'translate(' + x + 'px, ' + y + 'px)';


        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        target.classList.remove('draggable-back');
      }

      window.dragMoveListener = dragMoveListener;

      interact('.edicao').dropzone({
        accept: '.draggable',
        overlap: 0.75,
        ondropactivate: function(event) {
        },
        ondragenter: function(event) {

          event.relatedTarget.classList.add('draggable-inner');

        },
        ondragleave: function(event) {
        },
        ondrop: function(event) {
          scope.adicionarElemento(event);
        },
        ondropdeactivate: function(event) {

        }
      });


    }
  };
});
