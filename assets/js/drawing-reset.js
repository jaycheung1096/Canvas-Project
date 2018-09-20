class DrawingReset extends PaintFunction{
    constructor(contextReal){
        super();
        this.contextReal = contextReal;
        this.reset();
    }
    
    reset(event){
        this.contextReal.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        cPush();
    }

    // onMouseDown(){}
    // onDragging(){}
    // onMouseMove(){}
    // onMouseUp(){}
    // onMouseLeave(){}
    // onMouseEnter(){}
}