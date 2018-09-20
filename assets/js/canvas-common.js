let canvasReal = document.getElementById('canvas-real');
let contextReal = canvasReal.getContext('2d');
let canvasDraft = document.getElementById('canvas-draft');
let contextDraft = canvasDraft.getContext('2d');
let currentFunction;
let dragging = false;

$('#canvas-draft').mousedown(function(e){
    let mouseX = e.offsetX + canvasDrag.x;
    let mouseY = e.offsetY + canvasDrag.y;
    currentFunction.onMouseDown([mouseX,mouseY],e);
    dragging = true;
    
});

$('#canvas-draft').mousemove(function(e){
    let mouseX = e.offsetX + canvasDrag.x;
    let mouseY = e.offsetY + canvasDrag.y;
    if(dragging){
        currentFunction.onDragging([mouseX,mouseY],e);
    }
    currentFunction.onMouseMove([mouseX,mouseY],e);

});

$('#canvas-draft').mouseup(function(e){
    dragging = false;
    let mouseX = e.offsetX + canvasDrag.x;
    let mouseY = e.offsetY + canvasDrag.y;
    currentFunction.onMouseUp([mouseX,mouseY],e);
});

$('#canvas-draft').mouseleave(function(e){
    if (dragging)
    {
        let mouseX = canvasDraft.width + canvasDraft.offsetLeft + canvasDrag.x;
        let mouseY = canvasDraft.height + canvasDraft.offsetTop + canvasDrag.y;
        currentFunction.onMouseLeave([mouseX,mouseY],e);
    }
    else
    {
        dragging = false;
        let mouseX = e.offsetX + canvasDrag.x;
        let mouseY = e.offsetY + canvasDrag.y;
        currentFunction.onMouseLeave([mouseX,mouseY],e);
    }
});

$('#canvas-draft').mouseenter(function(e){
    let mouseX = e.offsetX + canvasDrag.x;
    let mouseY = e.offsetY + canvasDrag.y;
    currentFunction.onMouseEnter([mouseX,mouseY],e);
});

class PaintFunction{
    constructor(){}
    onMouseDown(){}
    onDragging(){}
    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}
}

// global var
// functional
let hollow;                                     // depends on input, need check mechanism
let outbound = false;                           // prevent stuck when mouse-out
let zooming = false;
let canvasDrag = {x: 0, y: 0};                         // canvasDrag.x .y
let canvasScale;
let canvasTranslate;

// line
let lineWidth = 5;                              // 1.0 up
let lineJoin = "round";                         // "bevel" || "round" || "miter"
let lineDash = false;

//color
// let paintColor = {r: 255, g: 255, b:255, a: 1};  // for drawing-paint.js
let background = "whitesmoke";      // CSS style string
let strokeColor = "hsl(199, 50%,50%)";
let fillColor = "rgba(255, 0, 44, 1)";       // "rgba(128, 139, 255, 0)" = white, transparent

//font
var textAlign = "start";
var textBaseline = "bottom";
var fontSize = "48px";
var fontFamily = "Georgia";
var fontColor = "black";

//color pad
let chosenColor = rgbaColor;
let stroke, fill;