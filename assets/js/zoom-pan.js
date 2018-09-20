// HTML5 Canvas Zoom and Pan Image
// https://codepen.io/techslides/pen/zowLd

// var canvas = document.getElementsByTagName('canvas-real');
// canvasReal.width = 800;
// canvasReal.height = 600;

var canvas = canvasReal;
var ctx = contextReal;
var ctxD = contextDraft;
var gkhead = new Image;

function zoompan() {

    function toB(){
        canvasReal.toBlob(function(blob)
        {
            gkhead.src = URL.createObjectURL(blob);
            console.log("src: ", gkhead.src);
        });
    }
    toB();
    // var ctx = canvasReal.getContext('2d');
    trackTransforms(ctx, ctxD);

    function redraw() {

        // Clear the entire canvas
        var p1 = contextReal.transformedPoint(0, 0);
        var p2 = contextReal.transformedPoint(canvasReal.width, canvasReal.height);
        canvasDrag = p1;
        contextReal.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);

        contextReal.save();
        contextReal.setTransform(1, 0, 0, 1, 0, 0);
        contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
        contextReal.restore();

        contextReal.drawImage(gkhead, 0, 0);

        // same for draft
        var p1D = contextDraft.transformedPoint(0, 0);
        var p2D = contextDraft.transformedPoint(canvasDraft.width, canvasDraft.height);
        contextDraft.clearRect(p1D.x, p1D.y, p2D.x - p1D.x, p2D.y - p1D.y);

        contextDraft.save();
        contextDraft.setTransform(1, 0, 0, 1, 0, 0);
        // contextDraft.drawImage(gkhead, 0, 0);
        contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        contextDraft.restore();

    }

    //redraw();

    var lastX = canvasReal.width / 2, lastY = canvasReal.height / 2;
    //
    var lastXD = canvasDraft.width / 2, lastYD = canvasDraft.height / 2;

    var dragStart, dragged, dragStartD, draggedD;

    canvasReal.addEventListener('mousedown', function (evt) {
        document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
        lastX = evt.offsetX || (evt.pageX - canvasReal.offsetLeft);
        lastY = evt.offsetY || (evt.pageY - canvasReal.offsetTop);
        dragStart = contextReal.transformedPoint(lastX, lastY);
        dragged = false;
        //
        lastXD = evt.offsetX || (evt.pageX - canvasDraft.offsetLeft);
        lastYD = evt.offsetY || (evt.pageY - canvasDraft.offsetTop);
        dragStartD = contextDraft.transformedPoint(lastXD, lastYD);
        draggedD = false;

    }, false);

    canvasReal.addEventListener('mousemove', function (evt) {
        lastX = evt.offsetX || (evt.pageX - canvasReal.offsetLeft);
        lastY = evt.offsetY || (evt.pageY - canvasReal.offsetTop);
        dragged = true;
        //
        lastXD = evt.offsetX || (evt.pageX - canvasDraft.offsetLeft);
        lastYD = evt.offsetY || (evt.pageY - canvasDraft.offsetTop);
        draggedD = true;

        if (dragStart) {
            var pt = contextReal.transformedPoint(lastX, lastY);
            contextReal.translate(pt.x - dragStart.x, pt.y - dragStart.y);
            //
            var ptD= contextDraft.transformedPoint(lastXD, lastYD);
            contextDraft.translate(ptD.x - dragStartD.x, ptD.y - dragStartD.y);

            redraw();
        }
    }, false);

    canvasReal.addEventListener('mouseup', function (evt) {
        dragStart = null;
        //
        dragStartD = null;

        if (!dragged) zoom(evt.shiftKey ? -1 : 1);
    }, false);

    var scaleFactor = 1.1;

    var zoom = function (clicks) {
        var pt = contextReal.transformedPoint(lastX, lastY);
        contextReal.translate(pt.x, pt.y);
        var factor = Math.pow(scaleFactor, clicks);
        contextReal.scale(factor, factor);
        contextReal.translate(-pt.x, -pt.y);
        //
        var ptD = contextDraft.transformedPoint(lastXD, lastYD);
        contextDraft.translate(ptD.x, ptD.y);
        var factorD = Math.pow(scaleFactor, clicks);
        contextDraft.scale(factorD, factorD);
        contextDraft.translate(-ptD.x, -ptD.y);

        redraw();
    }

    var handleScroll = function (evt) {
        var delta = evt.wheelDelta ? evt.wheelDelta / 40 : evt.detail ? -evt.detail : 0;
        if (delta) zoom(delta);
        return evt.preventDefault() && false;
    };

    canvasReal.addEventListener('DOMMouseScroll', handleScroll, false);
    canvasReal.addEventListener('mousewheel', handleScroll, false);
};



// Adds contextReal.getTransform() - returns an SVGMatrix
// Adds contextReal.transformedPoint(x,y) - returns an SVGPoint
function trackTransforms(ctx, ctxD) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    var xform = svg.createSVGMatrix();
    contextReal.getTransform = function () { return xform; };
    //
    var xformD = svg.createSVGMatrix();
    contextDraft.getTransform = function () { return xformD; };

    var savedTransforms = [];
    var save = contextReal.save;
    contextReal.save = function () {
        savedTransforms.push(xform.translate(0, 0));
        return save.call(ctx);
    };
    //
    var savedTransformsD = [];
    var saveD = contextDraft.save;
    contextDraft.save = function () {
        savedTransformsD.push(xformD.translate(0, 0));
        return saveD.call(ctxD);
    };

    var restore = contextReal.restore;
    contextReal.restore = function () {
        xform = savedTransforms.pop();
        return restore.call(ctx);
    };
    //
    var restoreD = contextDraft.restore;
    contextDraft.restore = function () {
        xformD = savedTransformsD.pop();
        return restoreD.call(ctxD);
    };

    var scale = contextReal.scale;
    contextReal.scale = function (sx, sy) {
        xform = xform.scaleNonUniform(sx, sy);
        return scale.call(ctx, sx, sy);
    };
    //
    var scaleD = contextDraft.scale;
    contextDraft.scale = function (sx, sy) {
        xformD = xformD.scaleNonUniform(sx, sy);
        return scaleD.call(ctxD, sx, sy);
    };

    var rotate = contextReal.rotate;
    contextReal.rotate = function (radians) {
        xform = xform.rotate(radians * 180 / Math.PI);
        return rotate.call(ctx, radians);
    };
    //
    var rotateD = contextDraft.rotate;
    contextDraft.rotate = function (radians) {
        xformD = xformD.rotate(radians * 180 / Math.PI);
        return rotateD.call(ctxD, radians);
    };

    var translate = contextReal.translate;
    contextReal.translate = function (dx, dy) {
        xform = xform.translate(dx, dy);
        return translate.call(ctx, dx, dy);
    };
    //
    var translateD = contextDraft.translate;
    contextDraft.translate = function (dx, dy) {
        xformD = xformD.translate(dx, dy);
        return translateD.call(ctxD, dx, dy);
    };

    var transform = contextReal.transform;
    contextReal.transform = function (a, b, c, d, e, f) {
        var m2 = svg.createSVGMatrix();
        m2.a = a; m2.b = b; m2.c = c; m2.d = d; m2.e = e; m2.f = f;
        xform = xform.multiply(m2);
        return transform.call(ctx, a, b, c, d, e, f);
    };
    //
    var transformD = contextDraft.transform;
    contextDraft.transform = function (a, b, c, d, e, f) {
        var m2D = svg.createSVGMatrix();
        m2D.a = a; m2D.b = b; m2D.c = c; m2D.d = d; m2D.e = e; m2D.f = f;
        xformD = xformD.multiply(m2D);
        return transformD.call(ctxD, a, b, c, d, e, f);
    };

    var setTransform = contextReal.setTransform;
    contextReal.setTransform = function (a, b, c, d, e, f) {
        xform.a = a;
        xform.b = b;
        xform.c = c;
        xform.d = d;
        xform.e = e;
        xform.f = f;
        return setTransform.call(ctx, a, b, c, d, e, f);
    };
    //
    var setTransformD = contextDraft.setTransform;
    contextDraft.setTransform = function (a, b, c, d, e, f) {
        xformD.a = a;
        xformD.b = b;
        xformD.c = c;
        xformD.d = d;
        xformD.e = e;
        xformD.f = f;
        return setTransformD.call(ctxD, a, b, c, d, e, f);
    };

    var pt = svg.createSVGPoint();
    contextReal.transformedPoint = function (x, y) {
        pt.x = x; pt.y = y;
        return pt.matrixTransform(xform.inverse());
    }
    //
    var ptD = svg.createSVGPoint();
    contextDraft.transformedPoint = function (x, y) {
        ptD.x = x; ptD.y = y;
        return ptD.matrixTransform(xformD.inverse());
    }
}