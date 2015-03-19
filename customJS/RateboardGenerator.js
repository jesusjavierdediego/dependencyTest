define(['FXM', "totem"], function(FXM, Totem) {
	var rateboardGenerator = {
		rates: undefined,
		ratesUrl: FXM.EndpointUrls.getRefinedRateBoard(),
		rateTemplate: $("script#travelMoneyRateTemplate").html(),
		
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
			var scrollItems = [];
			$.each(me.rates, function(key, value) {
				if (value.rank == 'HIGH') {
					fixedItems.push(_.template(me.rateTemplate, value));
				} else {
					scrollItems.push(_.template(me.rateTemplate, value));
				}
			});
			
			$('<ul/>', {
			    html: fixedItems.join('')
			}).appendTo('#ratesBoard');
			
			$('<ul/>', {
			    id: 'vertical-ticker',
			    html: scrollItems.join(''),
				style: 'overflow:hidden;'
			}).appendTo('#ratesBoard');
				
			$('#vertical-ticker').totemticker({
				row_height : '100px',
				mousestop : true,
			}); 
		}
	};
	return rateboardGenerator;
});