class DrawingPolygon extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;    
        this.contextDraft = contextDraft;
        this.continue = true;
        this.pointX = [];
        this.pointY = [];
    }
    
    onMouseUp(coord, event){
        // style
        this.contextDraft.strokeStyle = strokeColor;
        this.contextDraft.lineJoin = lineJoin;
        this.contextDraft.lineWidth = lineWidth;
        this.contextDraft.fillStyle = fillColor;
        this.contextReal.strokeStyle = strokeColor;
        this.contextReal.lineJoin = lineJoin;
        this.contextReal.lineWidth = lineWidth;
        this.contextReal.fillStyle = fillColor;
        // pin first point
        this.pointX.push(coord[0]);
        this.pointY.push(coord[1]);
        if (this.continue)
        {
            if (event.shiftKey)
            {
                this.kill();
                cPush();
            }
            else{
                this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
                this.drawDraft();
            }
        }
    }
    
    onMouseMove(coord, event){
        if (this.continue)
        {
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.drawDraft(coord);
        }
    }
    
    onMouseDown(){}
    onDragging(){}
    onMouseLeave(){}
    onMouseEnter(){}

    drawDraft(coord){
        this.contextDraft.beginPath();
        this.contextDraft.moveTo(this.pointX[0], this.pointY[0]);
        for (let i = 1; i < (this.pointX).length; i++){
            this.contextDraft.lineTo(this.pointX[i], this.pointY[i]);
        };
        if (typeof(coord) !== "undefined")
        {
            this.contextDraft.lineTo(coord[0], coord[1]);
        }
        this.contextDraft.closePath();
        this.contextDraft.stroke();  
        this.contextDraft.fill();   
    }

    drawReal(){
        this.contextReal.beginPath();
        this.contextReal.moveTo(this.pointX[0], this.pointY[0]);
        for (let i = 1; i < this.pointX.length; i++){
            this.contextReal.lineTo(this.pointX[i], this.pointY[i]);
        };
        this.contextReal.closePath();
        this.contextReal.stroke();
        this.contextReal.fill();
    }

    kill(){
        console.log("click");
        this.continue = false;
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.drawReal();
    }
}