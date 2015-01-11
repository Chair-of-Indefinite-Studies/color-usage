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

# Model

#### Constructor

No arguments are needed

#### register

* **entry** a color registered to the model. Signals a `registered`
event with the following arguments
1. `entry` the color registered.
2. `index` the index the entry got.
3. `usage` how often the entry was registered.


#### entries

Returns all registered entries.

* **sorter** an optional sorter can be provided. It should be a
  function that accepts two objects representing the entries. The
  objects have the following properties

1. `entry` the color registered.
2. `index` the index the entry got.
3. `usage` how often the entry was registered.

### View

The constructor represents the registered entries.

#### Constructor

The constructor accepts the following arguments

* **model** a `color.Usage` model. It will listed upon for
  `registered` event.
* **container** a DOM element that will serve as a parent to the
  elements created.
* **callback** a `function` that will be called for each new DOM
  element that will be created for each new entry. The DOM element
  will be a `span` and will have the following attributes

1. **data-entry** that will be the registered entry.
2. **data-index** the ordinal when the entry was registered.
3. **data-usage** how many times the entry was registered.
