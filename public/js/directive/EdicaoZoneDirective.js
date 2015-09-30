angular.module('jogo').directive('edicao', function() {
  return {
    restrict: 'C',
    link: function(scope, elem, attrs) {

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


      // this is used later in the resizing demo
      window.dragMoveListener = dragMoveListener;





      // enable draggables to be dropped into this
      interact('.edicao').dropzone({
        // only accept elements matching this CSS selector
        accept: '.draggable',
        // Require a 75% element overlap for a drop to be possible
        overlap: 0.75,

        // listen for drop related events:

        ondropactivate: function(event) {
          // add active dropzone feedback
          // event.target.classList.add('drop-active');
        },
        ondragenter: function(event) {

          event.relatedTarget.classList.add('draggable-inner');

        },
        ondragleave: function(event) {
          // remove the drop feedback style
          // event.target.classList.remove('drop-target');
          // event.relatedTarget.classList.remove('can-drop');
          // event.relatedTarget.textContent = 'Dragged out';
        },
        ondrop: function(event) {
          // event.relatedTarget.textContent = 'Dropped';
            scope.adicionarElemento();
        },
        ondropdeactivate: function(event) {
          // adicionarElemento();

        }
      });


    }
  };
});
