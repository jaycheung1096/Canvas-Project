class DrawingLine extends PaintFunction{
    constructor(contextReal, contextDraft){
        super();
        this.contextReal = contextReal;    
        this.contextDraft = contextDraft;        
    }
    
    onMouseDown(coord, event){
        // style
        this.contextDraft.strokeStyle = strokeColor;
        this.contextDraft.lineJoin = lineJoin;
        this.contextDraft.lineWidth = lineWidth;
        this.contextReal.strokeStyle = strokeColor;
        this.contextReal.lineJoin = lineJoin;
        this.contextReal.lineWidth = lineWidth;
        // starting pt
        this.origX = coord[0];
        this.origY = coord[1];
    }

    onDragging(coord, event){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.setLineDash([5,10]);
        this.drawDraft(coord[0],coord[1]);
    }

    onMouseUp(coord, event){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.setLineDash([]);
        this.drawReal(coord[0],coord[1]);
        cPush();
    }
    
    // onMouseMove(){}
    // onMouseLeave(){}
    // onMouseEnter(){}

    drawDraft(x,y){
        this.contextDraft.beginPath();
        this.contextDraft.moveTo(this.origX, this.origY);
        this.contextDraft.lineTo(x, y);
        this.contextDraft.closePath();
        this.contextDraft.stroke();  
    }

    drawReal(x,y){
        console.log("lineDash = ", lineDash);
        if (lineDash){
            this.contextReal.setLineDash([5,10]);
        }
        this.contextReal.beginPath();
        this.contextReal.moveTo(this.origX, this.origY);
        this.contextReal.lineTo(x, y);
        this.contextReal.closePath();
        this.contextReal.stroke();    
        if (lineDash){
            this.contextReal.setLineDash([]);
        }
    }
}