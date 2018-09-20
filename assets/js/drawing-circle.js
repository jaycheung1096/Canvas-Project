class DrawingCircle extends PaintFunction{
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
        // pin center
        this.centerX = coord[0];
        this.centerY = coord[1];
    }
    
    onDragging(coord, event){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.radius = Math.sqrt( Math.pow(this.centerX - coord[0] , 2) + Math.pow(this.centerY - coord[1], 2) );
        this.contextDraft.beginPath();
        this.contextDraft.setLineDash([5,10]);
        this.contextDraft.arc(this.centerX, this.centerY, this.radius, 0, 2*Math.PI, false);
        if (!hollow)
        {
            this.contextDraft.strokeStyle = fillColor;
        }
        this.contextDraft.stroke();
        this.contextDraft.setLineDash([]);
        if (!hollow)
        {
            this.contextDraft.fill();
        }
    }

    onMouseUp(coord, event){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.radius = Math.sqrt( Math.pow(this.centerX - coord[0] , 2) + Math.pow(this.centerY - coord[1], 2) );
        this.contextReal.beginPath();
        this.contextReal.arc(this.centerX, this.centerY, this.radius, 0, 2*Math.PI, false);
        if (!hollow)
        {
            this.contextReal.strokeStyle = fillColor;
        }
        this.contextReal.stroke();
        if (!hollow)
        {
            this.contextReal.fill();
        }
        cPush();
    }

    // onMouseMove(){}
    // onMouseLeave(){}
    // onMouseEnter(){}
}






// alt: ref pt on click, not coner
// this.cX = (this.centerX + coord[0]) / 2;
// this.cY = (this.centerY + coord[1]) / 2;
// this.r = ( (coord[0] - this.centerX) ) / 2;
// this.contextDraft.arc(this.cX, this.cY, this.r, 0, 2*Math.PI, false);