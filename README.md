Clank Selectbox is an AngularJS 1.x module that finds and replaces the &lt;select&gt; element with fully stylable elements.

To initialize a clank selectbox you only need to add the attribute "clank-selectbox" to a select element.
```html
<select clank-selectbox>
```
    
To use a custom module classname, instead of 'clank_select', give the directives attribute a value.
```html
<select clank-selectbox="test_module_name">
```
  
You can bind the open/close functionality to the label by adding the attribute "clank-selectbox-label-clickable"
```html
<select clank-selectbox clank-selectbox-label-clickable>
```

You can remove the button by adding the "clank-selectbox-disable-button" attribute to the select element
```html
<select clank-selectbox clank-selectbox-disable-button>
```

You can set the button text by using the "clank-selectbox-button-text" attribute.
```html
<select clank-selectbox clank-selectbox-button-text="Open Dropdown">
```

If you don't want the off-click element target to be the <body> you can specify and element using the "clank-selectbox-page-selector" attribute. Be sure to place the "." or "#" in front of the selectors name.
```html
<select clank-selectbox clank-selectbox-page-selector=".l-page">
```
  
  