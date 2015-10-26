angular.module('jogo').directive('resize', function() {
  return {
    restrict: 'C',
    scope: false,
    link: function(scope, elem, attrs) {
      $(elem).on('resize',function(){
        console.log('resized');
      });

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
            scope.$apply(function() {
              scope.historia.elementos[parseInt(target.getAttribute('data-posicao'))].height = valorHeightFinal;
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
        var target = event.target;
        var  x = parseFloat(target.getAttribute('data-x')) ,
          y = parseFloat(target.getAttribute('data-y'));
        var posicao = target.getAttribute('data-posicao');
        if (scope.historia.elementos[posicao]) {
          var transform = scope.historia.elementos[posicao].transform;
          var arrayValTemp = transform.split('translate(')[1].split(',');
          var top = parseFloat(arrayValTemp[1].replace("px)", ""));



          if (top != y) {
            var lado = parseFloat(arrayValTemp[0].replace("px", ""));
            target.setAttribute('data-x', top);
            target.setAttribute('data-y', lado);
            y = top;
            x = lado;
          }
        }

        x += event.dx;
        y += event.dy;

        var widthEdicao = document.querySelector('.edicao').clientWidth;

        scope.$apply(function() {
          scope.historia.elementos[parseInt(target.getAttribute('data-posicao'))].transform = 'translate(' + x + 'px, ' + y + 'px)';
        });

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);

        // target.classList.remove('draggable-back');
      }


    }
  };
});
