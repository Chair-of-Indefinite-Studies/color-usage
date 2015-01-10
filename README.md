color-usage
===========

Keep track of the colors used in a pixel-editor

Usage
-----

The color-usage is composed of different components.

### Model

A model keeps track of the colors used.

```js
var usage = new color.Usage();
```

### View

A view represents registered colors

```js
new color.UsageView(usage, document.getElementById('color'), function(element){
	element.textContent = element.getAttribute('data-entry');
});
```
