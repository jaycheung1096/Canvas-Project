$(document).ready(()=>{
    currentFunction = new DrawingLine(contextReal,contextDraft);
});
$('#drawing-rectangle').click(()=>{
    hollow = false;     // to be set by fillcolor
    currentFunction = new DrawingRectangle(contextReal,contextDraft);
});
$('#drawing-rectangle-hollow').click(()=>{
    hollow = true;      // to be set by fillcolor
    currentFunction = new DrawingRectangle(contextReal,contextDraft);
});
$('#drawing-quadratic-curve').click(()=>{
    currentFunction = new DrawingQuadraticCurve(contextReal,contextDraft);
});
$('#drawing-circle').click(()=>{
    hollow = false;     // to be set by fillcolor
    currentFunction = new DrawingCircle(contextReal,contextDraft);
});
$('#drawing-circle-hollow').click(()=>{
    hollow = true;      // to be set by fillcolor
    currentFunction = new DrawingCircle(contextReal,contextDraft);
});
$('#drawing-ellipse').click(()=>{
    currentFunction = new DrawingEllipse(contextReal,contextDraft);
});
$('#drawing-line').click(()=>{
    currentFunction = new DrawingLine(contextReal,contextDraft);
});
$('#drawing-polygon').click(()=>{
    currentFunction = new DrawingPolygon(contextReal,contextDraft);
});
$('#drawing-pencil').click(()=>{
    currentFunction = new DrawingPencil(contextReal,contextDraft);
});
$('#drawing-pencil-rotating-strokes').click(()=>{
    currentFunction = new DrawingPencilRotatingStrokes(contextReal,contextDraft);
});
$('#drawing-pencil-rotating-stars').click(()=>{
    currentFunction = new DrawingPencilRotatingStars(contextReal,contextDraft);
});
$('#drawing-pencil-random-dots').click(()=>{
    currentFunction = new DrawingPencilRandomDots(contextReal,contextDraft);
});
$('#drawing-font').click(()=>{
    currentFunction = new DrawingFont(contextReal,contextDraft);
});
$('#drawing-paint').click(()=>{
    currentFunction = new DrawingPaint(contextReal,contextDraft);
});
$('#drawing-eye-dropper').click(()=>{
    currentFunction = new DrawingEyeDropper(contextReal,contextDraft);
});
$('#drawing-eraser').click(()=>{
    currentFunction = new DrawingEraser(contextReal,contextDraft);
});
$('#drawing-reset').click(()=>{
    currentFunction = new DrawingReset(contextReal);
});
$('.zoom').click(()=>{
    // currentFunction = new DrawingZoomOut(contextReal);
    if (!zooming)
    {
        zooming = true;
        console.log("zoom: ", zooming);
        // push canvas real up
        zoompan();
        $("#canvas-real").css("z-index","10");
    }
    else
    {
        zooming = false;
        console.log("zoom: ", zooming);
        $("#canvas-real").css("z-index","1");
    }
});
$('#drawing-save').click(()=>{
    saveAsImage(contextReal);
});
$('#drawing-undo').click(()=>{
    cUndo();
});
$('#drawing-redo').click(()=>{
    cRedo();
});
$('#drawing-filter-GY').click(()=>{
    filter("grayscale");
});
$('#drawing-filter-BRUP').click(()=>{
    filter("brightnessUp");
});
$('#drawing-filter-BRDN').click(()=>{
    filter("brightnessDown");
});
$('#drawing-filter-threshold').click(()=>{
    filter("threshold");
});
$('#drawing-filter-convolute-sharpen').click(()=>{
    filter("convolute-sharpen");
});
$('#drawing-filter-convolute-blur').click(()=>{
    filter("convolute-blur");
});
$('#drawing-background').on("change", function(event){
    setBackground(event);
});

// ========================

$('#width1').click(()=>{
    lineWidth= 0.5 ;
});

$('#width2').click(()=>{ 
    lineWidth= 1 ;
});

$('#width3').click(()=>{   
    lineWidth= 2.5 ;
});

$('#width4').click(()=>{
    lineWidth= 5 ;
});

$('#width5').click(()=>{
    lineWidth= 10 ;
});

$('#width6').click(()=>{
    lineWidth= 15 ;
});

 $('#dotted').click(()=>{
    lineDash = (lineDash ? false : true);
});


$(".b1").on("click", function(event){
    stroke = true;
    fill = false;
    console.log("stroke : ", stroke);
});

$(".b2").on("click", function(){
    stroke = false;
    fill = true;
    console.log("fill : ", fill);
});

$(".b1, .b2").on("click", function(){
    $('#color-picker').css("opacity","100")
});

 $("#canvas-draft").on("click", function(){
    $('#color-picker').css("opacity","0")
});

$('#drawing-pencil, #drawing-eraser, #drawing-polygon, #drawing-quadratic-curve').on("click", function(){
    $('#width1, #width2, #width3, #width4, #width5, #width6').css("opacity","100");
    $('#dotted').css("opacity","0");
    lineDash = false; 
});

$('#drawing-line').on("click", function(){
    $('#width1, #width2, #width3, #width4, #width5, #width6, #dotted').css("opacity","100")
});

$('#drawing-rectangle, #drawing-rectangle-hollow, #drawing-circle,#drawing-circle-hollow, #drawing-pencil-rotating-strokes, #drawing-font,#drawing-paint,#drawing-ellipse,#drawing-eye-dropper,#drawing-reset,#drawing-save').on("click", function(){
    $('#width1, #width2, #width3, #width4, #width5, #width6,#dotted').css("opacity","0");  
});

$('#drawing-undo, #drawing-redo, #drawing-zoom-in, #drawing-zoom-out, #drawing-reset, #drawing-save, #drawing-background, #toggle, #1,#2').on("click", function(){
    $('#width1, #width2, #width3, #width4, #width5, #width6,#dotted').css("opacity","0");
});

$('#drawing-font').on("click",function(){
    $('#size1, #size2, #size3, #size4, #size5, #family1, #family2').css("opacity","100");
});

$('#drawing-font').on("dblclick",function(){
    $('#size1, #size2, #size3, #size4, #size5, #family1, #family2').css("opacity","0");
});