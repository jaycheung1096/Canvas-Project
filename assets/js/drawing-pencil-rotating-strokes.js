class DrawingPencilRotatingStrokes extends PaintFunction{
    constructor(contextReal){
        super();
        this.context = contextReal;            
    }
    
    onMouseDown(coord,event){
        // style
        this.context.strokeStyle = strokeColor;
        this.context.lineJoin = lineJoin;
        this.context.lineWidth = lineWidth;
        
        isDrawing = true;
        lastPoint = { x: coord[0], y: coord[1] };
    }
    onDragging(coord,event){

    }

    onMouseMove(coord, event){
        if (!isDrawing) return;
        console.log("ss");
        // var currentPoint = { x: event.clientX, y: event.clientY };
        var currentPoint = { x: coord[0], y: coord[1] };
        var dist = distanceBetween(lastPoint, currentPoint);
        var angle = angleBetween(lastPoint, currentPoint);
        
        for (var i = 0; i < dist; i++) {
            var x = lastPoint.x + (Math.sin(angle) * i);
            var y = lastPoint.y + (Math.cos(angle) * i);
            ctx.save();
            ctx.translate(x, y);
            ctx.scale(0.5, 0.5);
            ctx.rotate(Math.PI * 180 / getRandomInt(0, 180));
            ctx.drawImage(img, 0, 0);
            ctx.restore();
        }
        
        lastPoint = currentPoint;
    }

    onMouseUp(){
        isDrawing = false;
        cPush();
    }
    // onMouseLeave(){}
    // onMouseEnter(){}
}


// based on http://www.tricedesigns.com/2012/01/04/sketching-with-html5-canvas-and-brush-images/

var img = new Image();
img.src = "assets/img/brush2.png";
img.width = 10;

function distanceBetween(point1, point2) {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
function angleBetween(point1, point2) {
  return Math.atan2( point2.x - point1.x, point2.y - point1.y );
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var el = canvasReal;
var ctx = contextReal;
ctx.lineJoin = ctx.lineCap = 'round';

var isDrawing, lastPoint;