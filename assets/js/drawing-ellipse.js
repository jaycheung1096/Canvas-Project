class DrawingEllipse extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft; 
    }
    
    onMouseDown(coord, event){
        // style
        this.contextDraft.lineWidth = lineWidth;
        this.contextDraft.strokeStyle = strokeColor;
        this.contextDraft.fillStyle = fillColor;
        this.contextReal.lineWidth = lineWidth;
        this.contextReal.strokeStyle = strokeColor;
        this.contextReal.fillStyle = fillColor;
        // top pt
        startX = coord[0];
        startY = coord[1];
        dragging = true;
    }

    onDragging(coord, event){
        endX = coord[0];
        endY = coord[1];
        drawEllipse(startX,startY,endX,endY,dragging);
    }

    onMouseUp(coord, event){
        endX = coord[0];
        endY = coord[1];
        dragging = false;
        drawEllipse(startX,startY,endX,endY,dragging);
        cPush();
    }

    // onMouseMove(){}
    // onMouseLeave(){}
    // onMouseEnter(){}
}

var startX, startY;
var endX, endY;

function drawEllipse(x1,y1,x2,y2,dragging) {
    contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
    let radiusX = Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));
    let rotation = Math.atan((y2-y1)/(x2-x1));
    let c1=(x1+x2)/2;
    let c2=(y1+y2)/2;
    if (dragging)
    {
        contextDraft.beginPath();
        contextDraft.ellipse(c1, c2, radiusX, radiusX*0.3, rotation, 0, 2*Math.PI);
        contextDraft.stroke();
        contextDraft.fill();
    }
    else
    {
        contextReal.beginPath();
        contextReal.ellipse(c1, c2, radiusX, radiusX*0.3, rotation, 0, 2*Math.PI);
        contextReal.stroke();
        contextReal.fill();
    }
};