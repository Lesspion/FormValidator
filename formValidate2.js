var FormValidator = (function() {
	
	var self = {};
	
	self.Rule = function Rule(callback, errorMsg){
    	Rule.instancesList.push(this);
		
		this.stop = function(evt, errorMsg){
			alert(errorMsg);
			evt.preventDefault();
		}
		
		this.callback = function(field, evt){
			if(!callback(field, evt)){
				this.stop(evt, errorMsg);
			}
		}
	}
	
	self.Rule.getAllInstances = function(){
		return self.Rule.instancesList;
	}
  	self.Rule.instancesList = [];

	self.applyRules = function(field, evt){
		var rules = self.Rule.getAllInstances();
		console.log(rules);
		for(var rule in rules){
			console.log(rule);
			rules[rule].callback(field, evt);
		}
	}
		
	self.assign = function(formName){
		var currentForm = document.querySelector('form[data-form =' + formName + ']');
		this.form = currentForm;
		var that = this;
		currentForm.querySelector('[type=submit]').addEventListener('click', function(e){
			for(var i = 0; i < that.form.length; ++i){
				that.applyRules(that.form[i], e);
			}
		})
	}
	self.assignAll = function(){
		for(var i = 0; i < document.querySelectorAll('form').length; ++i){
			this.assign(document.querySelectorAll[i].dataset.name);
		}
	}
	
  	return self;
})();

// TODO : Give rules tags in order to be able to remove or manipulate them.

new FormValidator.Rule(function(field, e){
	if (field.dataset.required == "true" && field.value.length <= 0) {
		return false;
	}
	return true
}, "Field is missing !");

new FormValidator.Rule(function(field, e){
	if(field.dataset.confirm){
		return field.value === FormValidator.form.querySelector('[name='+field.dataset.confirm + ']').value;
	}
	return true;
}, "Two fields are missing !");

// Should implement this better, conditional that returns booleans are generally flawed
new FormValidator.Rule(function(field, e){
	if(field.dataset.min){
		return field.value.length < field.dataset.min ? (field.dataset.required === "true" ? false : true) : true;
	}
	return true;
}, "Min length is not respected.");

new FormValidator.Rule(function(field, e){
	if(field.dataset.max){
		return field.value.length > field.dataset.max ? (field.dataset.required === "true" ? false : true) : true;
	}
	return true;
}, "Max length is not respected.");
			
FormValidator.assign('register');