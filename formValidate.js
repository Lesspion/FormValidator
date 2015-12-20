(function () {
	var Forms = {
		form: null,
		error: {
			required: "Field is missing",
			min: "Respect the min length",
			max: "Respect the max length",
			confirm: "The two fields are missing"
		},
		stop: function (evt, type) {
			// display error message;
			alert(Forms.error[type] || type);
			evt.preventDefault();
		},
		confirmRule: function (field, e) {
			if (field.dataset.confirm) {
				field.value !== Forms.form.querySelector('[name=' + field.dataset.confirm + ']').value ? Forms.stop(e, "confirm") : "";
			}
		},
		requiredRule: function (field, e) {
			if (field.dataset.required == "true" && field.value.length <= 0) {
				Forms.stop(e, 'required');
			}
		},
		minRule: function (field, e) {
			if (field.dataset.min) {
				field.value.length < field.dataset.min ? (field.dataset.required == "true" ? Forms.stop(e, 'min') : "") : "";
			}
		},
		maxRule: function (field, e) {
			if (field.dataset.max) {
				field.value.length > field.dataset.max ? (field.dataset.required == "true" ? Forms.stop(e, 'max') : "") : "";
			}
		},
		callRules: function (field, e) {
			for (var rule in this.ruleList) {
				Rules[rule](field, e);
			}
		},
		assign: function (formName) {
			var currentForm = document.querySelector('form[data-form=' + formName + ']');
			this.form = currentForm;
			var that = this;
			currentForm.querySelector('[type=submit]').addEventListener('click', function (e) {
				console.log('that form : ', that.form);
				for (var i = 0; i < that.form.length; i++) {
					that.callRules(that.form[i], e);
				}
				that.stop(e, 'error');
			});
		},
		assignAll: function () {
			for (var j = 0; j < document.querySelectorAll('form').length; i++) {
				this.assign(document.querySelectorAll('form')[j].dataset.name);
			}
		}
	}
	
	var Rules = {
		confirm: Forms.confirmRule,
		required: Forms.requiredRule,
		min: Forms.minRule,
		max: Forms.maxRule
	};
	
	Forms.assign('register');
}).call(this);