function setBackground(evt)     //handleFileSelect
{
    // FileList object
    var files = evt.target.files;
    console.log("before for loop");
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

        // Only process image files.
        if (!f.type.match('image.*')) {
          continue;
        }  
        var reader = new FileReader();
        var img = new Image();
        console.log("b4 reader.onload");
        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                // console.log(e.target.result);
                img.src = e.target.result;
                // console.log(img.src == e.target.result);
                img.onload = function(){
                    var w = canvasReal.width;
                    var h = img.height / (img.width / w);
                    if (h > canvasReal.height)
                    {
                        h = canvasReal.height;
                        w = img.width / (img.height / h);
                    }
                    // console.log(w, h);
                    contextReal.drawImage(img, 0, 0, w, h);
                    cPush();
                };
            };
        })(f);
  
        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
        // processing anything after
        i = files.length;
      }
}