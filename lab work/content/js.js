
window.SA = {
    addEvent: function (element, evType, fn, useCapture) {
        if (element.addEventListener) {
            element.addEventListener(evType, fn, useCapture);
            return true;
        } else if (element.attachEvent) {
            var r = element.attachEvent('on' + evType, fn);
            return r;
        } else {
            element['on' + evType] = fn;
        }
    },

    load: function () {
        var anchorSelected;
        if (document.getElementsByClassName) {
            anchorSelected = document.getElementsByClassName('add')[0];
        } else {
            var anchors = document.getElementsByTagName('a'), //for IE6-7
                alenght = anchors.length;

            for (var i = 0; i < alenght; i++) {
                var anchor = anchors[i];

                if (anchor.className === "add") {
                    anchorSelected = anchor;
                }
            }
        }
        SA.addEvent(anchorSelected, "click", SA.addNode, false);
    },
    addNode: function (event) {
        var notes = document.getElementById('notes');
        var newNode = document.createElement('div');

        newNode.classList.add('note');
        newNode.setAttribute('contenteditable','');

        function getCoords(elem) {
            var box = elem.getBoundingClientRect();

            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };

        }
        newNode.innerHTML = document.getElementById('contentArea').value;

        notes.appendChild(newNode);
        newNode.onmousedown = function (e) {
            var coords = getCoords(newNode);
            var shiftX = e.pageX - coords.left;
            var shiftY = e.pageY - coords.top;

            newNode.style.position = 'absolute';
            moveAt(e);

            newNode.style.zIndex = 1000;

            function moveAt(e) {
                newNode.style.left = e.pageX - shiftX + 'px';
                newNode.style.top = e.pageY - shiftY + 'px';
            }

            document.onmousemove = function (e) {
                moveAt(e);
            };
            newNode.onmouseup = function () {
                document.onmousemove = null;
            };
        };


        return false;
    }

};

SA.addEvent(window,'load', SA.load, false);

