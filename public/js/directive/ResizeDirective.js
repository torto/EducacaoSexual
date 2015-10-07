angular.module('jogo').directive('resize', function(getController) {
  return {
    restrict: 'C',
    scope: false,
    link: function(scope, elem, attrs) {
      interact('.resize')
        .draggable({
          inertia: true,
          // keep the element within the area of it's parent
          restrict: {
            restriction: "parent",
            endOnly: true,
            elementRect: {
              top: 0,
              left: 0,
              bottom: 1,
              right: 1
            }
          },
          // call this function on every dragmove event
          onmove: dragMoveListener
        })
        .resizable({
          edges: {
            top: true,
            left: true,
            right: true,
            bottom: true
          }
        })
        .on('resizemove', function(event) {
          var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0),
            widthEdicao = document.querySelector('.edicao').style.width,
            heightEdicao = document.querySelector('.edicao').clientHeight;

          // var valorWidthFinal = (100 * event.rect.width) / widthEdicao;
          if (event.rect.height <= heightEdicao) {
            var valorHeightFinal = (100 * event.rect.height) / heightEdicao;
            // target.style.height = valorHeightFinal + '%';
            getController.getCadHistoria().$apply(function() {
              getController.getCadHistoria().elementoSelecionado.height = valorHeightFinal;
            });
            target.style.width = '100%';
            mudarTamanhoWidth(target);
          }
        });



      function mudarTamanhoWidth(target) {
        var tamanho = target.getElementsByTagName('img')[0].clientWidth;
        target.style.width = tamanho + 'px';
      }

      function dragMoveListener(event) {
        var target = event.target,
          // keep the dragged position in the data-x/data-y attributes
          x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
          y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        // target.style.webkitTransform =
        //   target.style.transform =
        //   'translate(' + x + 'px, ' + y + 'px)';

        var widthEdicao = document.querySelector('.edicao').clientWidth;

        getController.getCadHistoria().$apply(function() {
          getController.getCadHistoria().elementoSelecionado.transform = 'translate(' + x + 'px, ' + y + 'px)';
        });

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        // target.classList.remove('draggable-back');
      }


    }
  };
});
