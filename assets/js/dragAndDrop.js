"use strict";
// target elements with the "draggable" class
interact('.draggable')
    .draggable({
        inertia: true,
        restrict: {
            restriction: document.querySelector('body'),
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        autoScroll: true,
        onmove: dragMoveListener,
        onend: function (event) {
            let textEl = event.target.querySelector('p');

            textEl && (textEl.textContent =
                'moved a distance of '
                + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                Math.pow(event.pageY - event.y0, 2) | 0))
                    .toFixed(2) + 'px');
        }
    });

function dragMoveListener(event) {

    let target = event.target,

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

}


interact('.dropzoneCardFriendly').dropzone({
    accept: '.friendlyCard',
    overlap: 0.95,

    ondropactivate: function (event) {
        event.target.classList.add('drop-active');
    },

    ondragenter: function (event) {
        let draggableElement = event.relatedTarget,
            dropzoneElement = event.target;

        dropzoneElement.classList.add('drop-target');
        draggableElement.classList.add('can-drop');
        console.log("drop location friendly");
    },

    ondragleave: function (event) {
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');
    },

    ondrop: function (event) {
        event.relatedTarget.classList.remove('draggable');
        event.relatedTarget.classList.add('turnFriendly');
        document.querySelector(".friendlyCard").style.backgroundColor = "";
        console.log(event.relatedTarget);
    },

    ondropdeactivate: function (event) {
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
    }
});


interact('.dropzoneCardEnemy').dropzone({
    // only accept elements matching this CSS selector
    accept: '.enemyCard',
    // Require a 10% element overlap for a drop to be possible
    overlap: 0.10,

    ondropactivate: function (event) {
        event.target.classList.add('drop-active');
    },

    ondragenter: function (event) {
        let draggableElement = event.relatedTarget,
            dropzoneElement = event.target;

        dropzoneElement.classList.add('drop-target');
        draggableElement.classList.add('can-drop');
        console.log("drop location enemy");
    },

    ondragleave: function (event) {
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');
    },

    ondrop: function (event) {
        event.relatedTarget.classList.add('enemyCardOndeckDropZone');
    },

    ondropdeactivate: function (event) {
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
    }
});

//aanval enemy

interact('.enemyCardOndeckDropZone').dropzone({
    // only accept elements matching this CSS selector
    accept: '.friendlyCard',
    // Require a 10% element overlap for a drop to be possible
    overlap: 0.10,

    // listen for drop related events:

    ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active');
    },
    ondragenter: function (event) {
        let draggableElement = event.relatedTarget,
            dropzoneElement = event.target;

        // feedback the possibility of a drop
        dropzoneElement.classList.add('drop-target');
        draggableElement.classList.add('can-drop');
        // draggableElement.textContent = 'Dragged in';
        console.log("drop location enemy");
    },
    ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');

        // event.relatedTarget.textContent = 'Dragged out';
    },
    ondrop: function () {
        // event.relatedTarget.textContent = 'Dropped';
        console.log("aanval uitgevoerd");
    },
    ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
    }
});