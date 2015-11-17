define([], function() {
	var fxCalculator = {
		calculateBase: function(fxAmount, rate) {
			return parseFloat(this.calculateBaseAsString(fxAmount, rate));
		},
		
		calculateBaseAsString: function(fxAmount, rate) {
			return (fxAmount / rate).toFixed(2);
		},
		
		calculateFx: function(baseAmount, rate) {
			return parseFloat(this.calculateFxAsString(baseAmount, rate));
		},
		
		calculateFxAsString: function(baseAmount, rate) {
			return parseFloat((baseAmount * rate).toFixed(2));
		},
		
		roundToNote : function(amount, transType, denominations, upsellingDenomination, degradation) {
			if (denominations !== '') {
				return this.roundToNoteDenomination(amount, denominations, transType);
			}

			if (upsellingDenomination !== '') {
				return this.roundToNoteDegradation(amount, upsellingDenomination, transType);
			}

			return this.roundToNoteDegradation(amount, degradation, transType);
		},
		
		roundToNoteDegradation : function(amount, degradation, transType) {
			if (!degradation || degradation == 0) {
				return amount.toFixed(2);
			}
			var remainder = amount % degradation;
			if (remainder == 0) {
				return amount.toFixed(2);
			}
			if (transType === 'SELL') {
				return (amount + (degradation - remainder)).toFixed(2);
			}
			var roundedAmount = (amount - remainder).toFixed(2);
			if (roundedAmount == 0) {
				return degradation.toFixed(2);
			};
			return roundedAmount;
		},
		
		roundToNoteDenomination : function(amount, denominations, direction) {
			var denominationsArr = denominations.split(",");
			for(var i=0; i<denominationsArr.length; i++) { 
				denominationsArr[i] = parseInt(denominationsArr[i], 10); 
			}
			 
            for (var i=0; i<denominationsArr.length; i++) {
            	if ((amount % denominationsArr[i]) == 0) {
            		return amount.toFixed(2);            		
            	}
            }
			var degradation = denominationsArr[0];
			return this.roundToNoteDegradation(amount, degradation, direction);
		}
	};
	return fxCalculator;
});