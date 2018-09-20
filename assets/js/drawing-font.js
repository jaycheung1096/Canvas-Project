class DrawingFont extends PaintFunction{
    constructor(contextReal, contextDraft){
        super();
        this.contextReal = contextReal;
    }
    
    onMouseDown(coord, event){
        this.startX = coord[0];
        this.startY = coord[1];
    }

    onMouseUp(coord, event){
        this.endX = coord[0];
        this.endY = coord[1];
        this.w = Math.abs(this.startX - this.endX);
        console.log(this.startX, this.endX, this.w);
        initDrawingFont(this.startX, this.startY, this.w, background);
    }

    // onDragging(){}
    // onMouseMove(){}
    // onMouseLeave(){}
    // onMouseEnter(){}
}

// init canvas-text, creat txt field
function initDrawingFont(x, y, w, bgColor){
    $("#canvas-container").append('<canvas id="canvas-text" class="canvas" width="1280px" height="720px" style="z-index: 10"></canvas>');
    currentFunction = new CanvasInput({
        canvas: document.getElementById('canvas-text'),
        fontSize: 28,
        fontFamily: 'Arial',
        fontColor: fontColor,
        fontWeight: 'bold',
        x: x,
        y: y,
        width: w,
        padding: 8,
        borderWidth: 1,
        borderColor: "#fff",
        backgroundColor: "rgba(38, 255, 37, 0)",
        placeHolder: 'Enter message here...',
        onsubmit: function() {print(currentFunction.value(), x, y, w);}
        });
}

// print txt, kill txt field n canvas-text
function print(value, x, y, w){
    // print on real
    console.log(value, x, y);
    contextReal.font = `${fontSize} ${fontFamily}`;
    contextReal.textAlign = `${textAlign}`;
    contextReal.textBaseline = `${textBaseline}`;
    contextReal.fillStyle = `${fontColor}`;
    contextReal.fillText(`${value}`, x, y+45);   // offset, not sure why
    // kill canvas-text
    $("#canvas-text").remove();
    cPush();
    currentFunction = new DrawingFont(contextReal,contextDraft);
}

// global var (options)
// ctx.textAlign = "left" || "right" || "center" || "start" || "end";
// ctx.textBaseline = "top" || "hanging" || "middle" || "alphabetic" || "ideographic" || "bottom";
// ctx.font = '48px Georgia';
// ctx.strokeText('Hello world', 50, 100);
// ctx.fillText('Hello world', 50, 300);
// // Create gradient
// let gradient = this.contextReal.createLinearGradient(0,0,canvasDraft.width,0);
// gradient.addColorStop("0","magenta");
// gradient.addColorStop("0.5","blue");
// gradient.addColorStop("1.0","red");
// // Fill with gradient
// this.contextReal.fillStyle = gradient;
// ctx.measureText(text); ??
