define([], function() {
	var cookieService = {
		// expire values in hours
		defaultExpiry : 1,
		maxExpiry : 336,

		setCookie : function(cookieName, cookieValue, expiry) {
			var date = new Date();
			date.setTime(date.getTime() + (this.getExpiry(expiry) * 60 * 60 * 1000));
			var expires = "expires=" + date.toGMTString();
			document.cookie = cookieName + "=" + cookieValue + "; " + expires;
		},
		
		setCookieOnDomain : function(cookieName, cookieValue, expiry) {
			var date = new Date();
			date.setTime(date.getTime() + (this.getExpiry(expiry) * 60 * 60 * 1000));
			var expires = ";expires=" + date.toGMTString();
			var domain = ";domain=" + location.host;
			var path = ";path=/";
			document.cookie = cookieName + "=" + cookieValue + expires + domain + path;
		},

		getCookie : function(cookieName) {
			var pairs = document.cookie.split("; "), count = pairs.length, parts;
			while (count--) {
				parts = pairs[count].split("=");
				if (parts[0] === cookieName)
					return parts[1];
			}
			return false;
		},

		getExpiry : function(expiry) {
			if (!expiry || isNaN(expiry)) {
				return this.defaultExpiry;
			}
			if (expiry > this.maxExpiry) {
				return this.maxExpiry;
			}
			return parseFloat(expiry);
		}
	};
	return cookieService;
});
