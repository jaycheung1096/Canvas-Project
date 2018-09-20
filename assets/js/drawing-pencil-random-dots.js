class DrawingPencilRandomDots extends PaintFunction {
    constructor(contextReal) {
        super();
        this.context = contextReal;
    }

    onMouseDown(coord, event) {
        // style
        this.context.fillStyle = fillColor;
        this.context.lineWidth = lineWidth;
        this.context.lineJoin = this.context.lineCap = 'round';

        var ctx = this.context;

        clientX = coord[0];
        clientY = coord[1];
        console.log(density);
        if (!dragging)
        {
            console.log(clientX,clientY);
            this.isDraw(coord);
        }
    }

    onDragging(coord, event) {
        dragging = true;
        clientX = coord[0];
        clientY = coord[1];
    }

    onMouseMove(coord, event) {
    }

    onMouseUp(coord) {
        timeout = false;
        dragging = false;
        cPush();
    }
    // onMouseLeave(){}
    // onMouseEnter(){}
    isDraw(coord){
        timeout = setTimeout(function draw() {
            for (var i = density; i--;) {
                var angle = getRandomFloat(0, Math.PI * 2);
                var radius = getRandomFloat(0, 30);
                ctx.globalAlpha = Math.random();
                ctx.fillRect(
                    clientX + radius * Math.cos(angle),
                    clientY + radius * Math.sin(angle),
                    getRandomFloat(1, 2), getRandomFloat(1, 2));
            }
            if (!timeout)
            {
                contextReal.globalAlpha = 1;
                console.log("!timeout", contextReal.globalAlpha);
                return;
            }
            timeout = setTimeout(draw, 50);
        }, 50);


    }
}

function getRandomFloat(min, max) {
    return (Math.random() * (max - min) + min);
}

var clientX, clientY, timeout;
var density = lineWidth * 50;
