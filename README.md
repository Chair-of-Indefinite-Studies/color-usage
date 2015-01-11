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

API
---

The model responds to to the following API.

### Constructor

No arguments are needed

### register

* **entry** a color registered to the model. Signals a `registered`
event with the following arguments
1. `entry` the color registered.
2. `index` the index the entry got.
3. `usage` how often the entry was registered.


### entries

Returns all registered entries.

* **sorter** an optional sorter can be provided. It should be a
  function that accepts two objects representing the entries. The
  objects have the following properties

1. `entry` the color registered.
2. `index` the index the entry got.
3. `usage` how often the entry was registered.
