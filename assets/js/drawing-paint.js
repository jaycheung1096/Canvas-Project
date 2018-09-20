class DrawingPaint extends PaintFunction{
    constructor(contextReal){
        super();
        this.contextReal = contextReal;
    }
    
    onMouseUp(coord, event){
        paintBucketApp(event);
        cPush();
    }
    
    // onMouseDown(){}
    // onDragging(){}
    // onMouseMove(){}
    // onMouseLeave(){}
    // onMouseEnter(){}
}

function paintBucketApp(e)
{
    var canvas = canvasReal;
    var ctx = contextReal;
    var data = [];

    var getPixelPos = function (x, y) {
        return (y * canvas.width + x) * 4;
    };

    var matchStartColor = function (data, pos, startColor) {
    return (data[pos]   === startColor.r &&
            data[pos+1] === startColor.g &&
            data[pos+2] === startColor.b &&
            data[pos+3] === startColor.a);
    };

    var colorPixel = function (data, pos, color) {
        data[pos] = color.r || 0;
        data[pos+1] = color.g || 0;
        data[pos+2] = color.b || 0;
        data[pos+3] = color.a; //color.hasOwnProperty("canvas-real") ? color.a : 255;
    };

    // http://www.williammalone.com/articles/html5-canvas-javascript-paint-bucket-tool/
    var floodFill = function (startX, startY, fillColor) {
        //var srcImg = ctx.getImageData(0,0,canvas.width,canvas.height);
        //var srcData = srcImg.data;
        var dstImg = ctx.getImageData(0,0,canvas.width,canvas.height);
        var dstData = dstImg.data;
        
        var startPos = getPixelPos(startX, startY);
        var startColor = {
            r: dstData[startPos],
            g: dstData[startPos+1],
            b: dstData[startPos+2],
            a: dstData[startPos+3]
        };
        var todo = [[startX,startY]];
        
        while (todo.length) {
            var pos = todo.pop();
            var x = pos[0];
            var y = pos[1];    
            var currentPos = getPixelPos(x, y);
            
            while((y-- >= 0) && matchStartColor(dstData, currentPos, startColor)) {
            currentPos -= canvas.width * 4;
            }
            
            currentPos += canvas.width * 4;
            ++y;
            var reachLeft = false;
            var reachRight = false;
            
            while((y++ < canvas.height-1) && matchStartColor(dstData, currentPos, startColor)) {
            
            colorPixel(dstData, currentPos, fillColor);
            
            if (x > 0) {
                if (matchStartColor(dstData, currentPos-4, startColor)) {
                    if (!reachLeft) {
                        todo.push([x-1, y]);
                        reachLeft = true;
                    }
                }
                else if (reachLeft) {
                    reachLeft = false;
                }
            }
            
            if (x < canvas.width-1) {
                if (matchStartColor(dstData, currentPos+4, startColor)) {
                    if (!reachRight) {
                        todo.push([x+1, y]);
                        reachRight = true;
                    }
                }
                else if (reachRight) {
                    reachRight = false;
                }
            }
            currentPos += canvas.width * 4;
            }
        }
        
        ctx.putImageData(dstImg,0,0);
    };

    // canvas.onclick = function (e) {
        // var startX = e.clientX - 10;
        // var startY = e.clientY - 10;
        var startX = e.offsetX - 10;
        var startY = e.offsetY - 10;

    var sameColor = function(x, y){
        // px color
        var pin = contextReal.getImageData(x, y, 1, 1).data;
        console.log(`pin: ${pin}`);
        var paint = fillColor.match(/\d+/g);
        console.log(`paint: ${paint}`);
        if (pin[0] == paint[0] &&
            pin[1] == paint[1] &&
            pin[2] == paint[2])
        {
            console.log("same");
            return true;
        }
        else
        {
            console.log("!same");
            paintcolor = {r: paint[0], g: paint[1], b: paint[2] , a: paint[3]};
            console.log(paintcolor);
            return false;
        }
    };

    var paintcolor;
    // console.log(paintcolor);
    if (!sameColor(startX, startY))
    {
        floodFill(startX, startY, paintcolor);
    }
};
