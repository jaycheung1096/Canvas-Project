class DrawingPencilRotatingStars extends PaintFunction{
    constructor(contextReal, contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.points = [];
        // this.radius = 15;
    }
    
    onMouseDown(coord,event){
        // style
        // this.context.strokeStyle = strokeColor;
        // this.context.lineJoin = lineJoin;
        // this.context.lineWidth = lineWidth;
        // start
        this.points.push({ x: coord[0], y: coord[1], angle: getRandomInt(0, 180) });
    }

    onDragging(coord,event){
        this.points.push({ x: coord[0], y: coord[1], angle: getRandomInt(0, 180) });        
        this.contextDraft.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (var i = 0; i < this.points.length; i++) {
            drawStar(this.points[i].x, this.points[i].y, this.points[i].angle, this.contextDraft);
        }
    }

    onMouseMove(){}

    onMouseUp(){
        this.contextDraft.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (var i = 0; i < this.points.length; i++) {
            drawStar(this.points[i].x, this.points[i].y, this.points[i].angle, this.contextReal);
        }
        this.points.length = 0;
        cPush();
    }
    // onMouseLeave(){}
    // onMouseEnter(){}
}


// http://carisenda.com/blog/2012/howto-draw-a-star-with-canvas.html

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawStar(x, y, angle, context) {
    var ctx = context;
    var length = 15;
    ctx.lineWidth = 2;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.strokeStyle = 'purple';  // strokeColor
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.rotate(Math.PI / 180 * angle);
    for (var i = 5; i--;) {
        ctx.lineTo(0, length);
        ctx.translate(0, length);
        ctx.rotate((Math.PI * 2 / 10));
        ctx.lineTo(0, -length);
        ctx.translate(0, -length);
        ctx.rotate(-(Math.PI * 6 / 10));
    }
    ctx.lineTo(0, length);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}