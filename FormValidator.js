(function () {
    var forms = document.querySelectorAll('form');
    console.log(forms);
    for (var i = 0; i < forms.length; i++) {
        console.log(forms[i].attributes);
        for (var j = 0; j < forms[i].attributes.length; j++) {
            console.log(forms[i].attributes[j]);
        }
    }
})(this);
