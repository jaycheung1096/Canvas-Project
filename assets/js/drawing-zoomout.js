class DrawingZoomOut extends PaintFunction{
    constructor(contextReal){
        super();
        this.context = contextReal;            
	}
	
	redraw() {
		let canvasPic = new Image();
		canvasPic.src=document.getElementById('canvas-real').toDataURL();
		this.context.clearRect(0,0,canvasReal.width,canvasReal.height);
		let ctx = this.context;          
		canvasPic.onload = function () { 
			ctx.drawImage(canvasPic, 0, 0); 
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			}
	}

	zoomout() {
		this.context.scale(1/1.05, 1/1.05);
		this.redraw();
	}
    
    onMouseDown(coord,event){
		this.zoomout();
	}
	
    onDragging(coord,event){
    }

    onMouseUp(){
		
    }
    // onMouseMove(){}
    // onMouseLeave(){}
    // onMouseEnter(){}
}


/*function ZoomIn() {

	function redraw() {
		let url=document.getElementById('canvas-real').toDataURL();	
		let canvasPic = new Image();
		canvasPic.src=url;
		contextReal.clearRect(0,0,canvasReal.width,canvasReal.height);          
		canvasPic.onload = function () { contextReal.drawImage(canvasPic, 0, 0); }
	}

	document.getElementById('canvas-draft').addEventListener('mousedown', function (evt) {
		console.log('mousedown');
	});

	canvasReal.addEventListener('mousemove', function (evt) {
	});

	var zoom = function () {
		contextReal.scale(1.05, 1.05);
		redraw();
	}

	canvasReal.addEventListener('mouseup', function (evt) {
		console.log('mouseup');
		zoom();
	});

	var handleScroll = function (evt) {
		var delta = evt.wheelDelta ? evt.wheelDelta / 40 : evt.detail ? -evt.detail : 0;
		if (delta) zoom();
	};

	canvasReal.addEventListener('DOMMouseScroll', handleScroll);
	canvasReal.addEventListener('mousewheel', handleScroll);
}*/