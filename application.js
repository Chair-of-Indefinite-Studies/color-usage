(function(color){
    var usage = new color.Usage();

    var colorInput = document.getElementById('color');
    document.getElementById('add').addEventListener('click', function(event){
	usage.register(colorInput.value);
	console.log(colorInput.value);
    });
})(color);
