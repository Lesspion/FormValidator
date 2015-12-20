(function () {
    var stop = function (e, msg) {
        alert(msg);
        e.preventDefault();
    };
    
    var Forms = function (formName) {
        var form = document.querySelector('form[data-form=' + formName + ']');
        form.querySelector('[type=submit]').addEventListener('click', function (e) {
            for (var i = 0; i < form.length; i++) {
                if (form[i].dataset.required == "true" && form[i].value.length <= 0) {
                    stop(e, "A field is missing");
                }
                if (form[i].dataset.max) {
                    form[i].value.length > form[i].dataset.max ? (form[i].dataset.required == "true" ? stop(e, 'out of max') : "") : "";
                }
                if (form[i].dataset.min) {
                    form[i].value.length < form[i].dataset.min ? (form[i].dataset.required == "true" ? stop(e, 'out of min') : "") : "";
                }
                if (form[i].dataset.confirm) {
                    form[i].value !== form.querySelector('[name=' + form[i].dataset.confirm + ']').value ? stop(e, "different value") : "";
                }
            }
        });
    };
    for (var i = 0; i < document.querySelectorAll('form').length; i++) {
        Forms(document.querySelectorAll('form')[i].dataset.name);
    }
}).call(this);