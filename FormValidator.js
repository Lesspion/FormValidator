(function () {
    var stop = function (e, msg) {
        alert(msg);
        e.preventDefault();
    };
    
    var Forms = function (formName) {
        var form = document.querySelector('form[data-form=' + formName + ']');
        for (var j = 0; j < form.length; j++) {
            // console.log(form[j].dataset);
        }
        form.querySelector('[type=submit]').addEventListener('click', function (e) {
            for (var i = 0; i < form.length; i++) {
                // console.log("boulou : ", form[i].dataset);
                if (form[i].dataset.required == "true" && form[i].value.length <= 0) {
                    stop(e, "A field is missing");
                }
                if (form[i].dataset.max) {
                    form[i].value.length <= form[i].dataset.max ? '' : (form[i].dataset.required == "true" ? stop(e, 'out of max') : "");
                }
                if (form[i].dataset.min) {
                    form[i].value.length < form[i].dataset.min ? (form[i].dataset.required == "true" ? stop(e, 'out of min') : "") : "";
                }
            }
        });
    };
    Forms("register");
}).call(this);