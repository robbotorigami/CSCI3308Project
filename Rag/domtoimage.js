var node = document.getElementById('my-node');

domtoimage.toPng(node)
    .then (function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        document.appendChild(img);
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });