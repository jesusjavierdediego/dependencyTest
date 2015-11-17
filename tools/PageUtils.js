define(['jquery'], function($) {
	var pageUtils = {
		scrollToTop: function() {
        	$('html, body').animate({ scrollTop: 0 }, 'medium');
        }
	};
	
	return pageUtils;
});