class DrawingEraser extends PaintFunction{
    constructor(contextReal){
        super();
        this.context = contextReal;            
    }
    
    onMouseDown(coord,event){
        // style
        this.context.strokeStyle = background;
        this.context.lineJoin = lineJoin;
        this.context.lineWidth = lineWidth;
        // start
        this.context.beginPath();
        this.context.moveTo(coord[0],coord[1]);
        this.draw(coord[0],coord[1]);
    }
    onDragging(coord,event){
        this.draw(coord[0],coord[1]);
    }

    onMouseUp(coord,event){
        cPush();
    }
    // onMouseMove(){}
    // onMouseLeave(){}
    // onMouseEnter(){}

    draw(x,y){
        this.context.lineTo(x,y);
        this.context.closePath();
        this.context.stroke();    
        this.context.moveTo(x,y);
    }
}