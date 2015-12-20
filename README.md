# FormValidator
An automatic form validator for HTML5 written in javascript

Using it is straightforward. First, declare a HTML5 form with a name, and in the javascript code, just type :
```js
FormValidator.assign('MyFormName');
```

Alternatively, if you don't want to bother with form names, and just want to add the validator to all your forms, you can use :
```js
FormValidator.assignAll();
```

Have fun !
