(function(color){
    var usage = new color.Usage();

    new color.UsageView(usage, document.getElementById('colors'), function(element){
	var color = element.getAttribute('data-entry');
	element.textContent = color;
	element.style.background = color;
	element.classList.add('used', 'color', color);
    });

    var colorInput = document.getElementById('color');
    document.getElementById('add').addEventListener('click', function(event){
	usage.register(colorInput.value);
    });
})(color);
