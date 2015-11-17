// fix for ajax on ie 8 and 9
define([], function() {
	var jQueryDefaults = function() {
		
		if ($.ui && $.ui.dialog) {
			$.extend($.ui.dialog.prototype.options, {
				modal : true,
				minWidth : 250,
				buttons : [ {
					text: 'OK', 
					click : function() {
						$(this).dialog('close'); 
						}
				}]
			});
		}
			
		$.support.cors = true;
		
		if (window.XDomainRequest) {
			$.support.cors = false;
			$.ajaxTransport(function(s) {
				if (s.crossDomain && s.async) {
					if (s.timeout) {
						s.xdrTimeout = s.timeout;
						delete s.timeout;
					}
					var xdr;
					return {
						send : function(_, complete) {
							function callback(status, statusText, responses, responseHeaders) {
								xdr.onload = xdr.onerror = xdr.ontimeout = $.noop;
								xdr = undefined;
								complete(status, statusText, responses, responseHeaders);
							}
	
							xdr = new XDomainRequest();
							xdr.onload = function() {
								callback(200, "OK", {
									text : xdr.responseText
								}, "Content-Type: " + xdr.contentType);
							};
							xdr.onprogress = function() {
							};
							xdr.onerror = function() {
								callback(404, "Not Found");
							};
							xdr.ontimeout = function() {
								callback(0, "timeout");
							};
							xdr.timeout = s.xdrTimeout || Number.MAX_VALUE;
							xdr.open(s.type, s.url);
							xdr.send((s.hasContent && s.data ) || null);
						},
						abort : function() {
							if (xdr) {
								xdr.onerror = $.noop;
								xdr.abort();
							}
						}
					};
				}
			});
		}
	};
	return jQueryDefaults;
});