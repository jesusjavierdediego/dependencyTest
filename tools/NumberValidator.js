define([], function() {
	var numberValidator = {
		isValid: function(number) {
			if (number === '' || isNaN(number) || number === 0) {
				return false;
			}
			return true;
		}
	};
	return numberValidator;
});