define(['FXM', "totem"], function(FXM, Totem) {
	var exchangeRatesGenerator = {
		rates: undefined,
		ratesUrl: FXM.EndpointUrls.getRefinedRateBoard(),
		rateTemplate: $("script#exchangeRateTemplate").html(),

		loadRates: function(rates) {
			this.rates = rates;
			if (this.rates) {
				this.populateRateBoard();
				return;
			}
			var me = this;
			$.getJSON(me.ratesUrl, function(data) {
				me.rates = data.wrappedObject;
				me.populateRateBoard();
			});
		},

		populateRateBoard: function() {
			var me = this;
			var fixedItems = [];
			$.each(me.rates, function(key, value) {
				fixedItems.push(_.template(me.rateTemplate, {
                        'description': value.description,
                        'isoAlphaCode': value.isoAlphaCode,
                        'flag': value.isoAlphaCode.toLowerCase(),
                        'sellNote': value.sellNote,
						'buyNote': value.buyNote
                 }));
			});

			$('<ul/>', {
			    html: fixedItems.join('')
			}).appendTo('#exchangeRatesBoard');
		}
	};
	return exchangeRatesGenerator;
});
