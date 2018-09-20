class DrawingEyeDropper extends PaintFunction{
    constructor(contextReal){
        super();
        this.contextReal = contextReal;
    }

    onMouseUp(coord, event){
        var data = contextReal.getImageData(coord[0], coord[1], 1, 1).data;
        // rgba(r, g, b, 255);
        // console.log(data);
        var color = `rgba( ${data[0]}, ${data[1]}, ${data[2]}, ${data[3]})`;
        console.log("dropper : " + color);
        fillColor = color;
        strokeColor = color;
        fontColor = color;
        $(".b1").attr("style", `background-color: ${strokeColor}`);
        $(".b2").attr("style", `background-color: ${fillColor}`);
    }
    // onMouseDown(){}
    // onDragging(){}
    // onMouseMove(){}
    // onMouseLeave(){}
    // onMouseEnter(){}
}