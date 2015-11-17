define([], function() {
	var urlParamService = {
		getUrlParam : function(name) {
			var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
			if (results == null) {
				return null;
			}
			return results[1] || 0;
		}
	};
	return urlParamService;
});
