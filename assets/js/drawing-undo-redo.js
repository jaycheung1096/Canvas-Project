var cPushArray = [];
var cStep = 0;
var ctx;
ctx = document.getElementById('canvas-real').getContext("2d");
// let canvasReal = document.getElementById('canvas-real');
// let contextReal = canvasReal.getContext('2d');
	
function cPush() {
    if (cStep < cPushArray.length) 
        cPushArray.length = cStep;
    cStep++;
    cPushArray.push(document.getElementById('canvas-real').toDataURL());
}

function cUndo() {
    console.log("undo");
    if (cStep > 0) {
        cStep--;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep-1];
        ctx.clearRect(0,0,canvasDraft.width,canvasDraft.height);            // added to clear canvas
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
    }
}

function cRedo() {
    console.log("redo");
    if (cStep < cPushArray.length) {
        cStep++;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep-1];
        ctx.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
    }
    
}