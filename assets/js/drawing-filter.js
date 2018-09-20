function filter(choice){
    // get canvas px
    var px = Filters.getPixels();
    console.log(px);
    // choose filters
    if (choice == "grayscale"){
        var newPx = Filters.grayscale(px);
    }
    else if (choice == "brightnessUp"){
        var newPx = Filters.brightness(px, 10);
    }
    else if (choice == "brightnessDown"){
        var newPx = Filters.brightness(px, -10);
    }
    else if (choice == "threshold"){
        var newPx = Filters.threshold(px, 120);
    }
    else if (choice == "convolute-sharpen"){
        var matrix = [  0, -1,  0,
                       -1,  5, -1,
                        0, -1,  0 ];
        var newPx = Filters.convolute(px, matrix);
    }
    else if (choice == "convolute-blur"){
        var matrix = [  1/9, 1/9, 1/9,
                        1/9, 1/9, 1/9,
                        1/9, 1/9, 1/9 ];
        var newPx = Filters.convolute(px, matrix);
    }
    console.log(newPx);
    // draw new image
    contextReal.putImageData(newPx, 0, 0);
    cPush();
}

Filters = {};
// retrieve the image pixels
Filters.getPixels = function() {
    return contextReal.getImageData(0, 0, canvasReal.width, canvasReal.height);
};

// filtered prototype
// Filters.filterImage = function(filter, image, var_args) {
//     var args = [this.getPixels(image)];
//     for (var i=2; i<arguments.length; i++) {
//         args.push(arguments[i]);
//     }
//     return filter.apply(null, args);
// };

// grayscale
Filters.grayscale = function(pixels, args) {
    var d = pixels.data;
    for (var i=0; i<d.length; i+=4) {
        var r = d[i];
        var g = d[i+1];
        var b = d[i+2];
        // CIE luminance for the RGB
        // The human eye is bad at seeing red and blue, so we de-emphasize them.
        var v = 0.2126*r + 0.7152*g + 0.0722*b;
        d[i] = d[i+1] = d[i+2] = v
    }
    return pixels;
};

// brightness +-
Filters.brightness = function(pixels, adjustment) {
    var d = pixels.data;
    for (var i=0; i<d.length; i+=4) {
      d[i] += adjustment;
      d[i+1] += adjustment;
      d[i+2] += adjustment;
    }
    return pixels;
};

// threshold, gscale vs thsd
Filters.threshold = function(pixels, threshold) {
    var d = pixels.data;
    for (var i=0; i<d.length; i+=4) {
      var r = d[i];
      var g = d[i+1];
      var b = d[i+2];
      var v = (0.2126*r + 0.7152*g + 0.0722*b >= threshold) ? 255 : 0;
      d[i] = d[i+1] = d[i+2] = v
    }
    return pixels;
};

// convolution, sharpen, blur
Filters.convolute = function(pixels, weights, opaque) {
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side/2);
    var src = pixels.data;
    var sw = pixels.width;
    var sh = pixels.height;
    // pad output by the convolution matrix
    var w = sw;
    var h = sh;
    var output = contextDraft.createImageData(w,h);      //Filters.createImageData(w, h);
    var dst = output.data;
    // go through the destination image pixels
    var alphaFac = opaque ? 1 : 0;
    for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
        var sy = y;
        var sx = x;
        var dstOff = (y*w+x)*4;
        // calculate the weighed sum of the source image pixels that
        // fall under the convolution matrix
        var r=0, g=0, b=0, a=0;
        for (var cy=0; cy<side; cy++) {
        for (var cx=0; cx<side; cx++) {
            var scy = sy + cy - halfSide;
            var scx = sx + cx - halfSide;
            if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
            var srcOff = (scy*sw+scx)*4;
            var wt = weights[cy*side+cx];
            r += src[srcOff] * wt;
            g += src[srcOff+1] * wt;
            b += src[srcOff+2] * wt;
            a += src[srcOff+3] * wt;
            }
        }
        }
        dst[dstOff] = r;
        dst[dstOff+1] = g;
        dst[dstOff+2] = b;
        dst[dstOff+3] = a + alphaFac*(255-a);
    }
    }
    return output;
};
