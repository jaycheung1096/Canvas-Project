function saveAsImage() {
    canvasReal.toBlob(function(blob) {
        var newImg = document.createElement('img');
        url = URL.createObjectURL(blob);

        var a = document.createElement('a');
        a.href = url;
        a.download = 'image.jpg';
        a.click();
        });
}