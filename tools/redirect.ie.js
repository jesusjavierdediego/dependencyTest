// Support for noredirect feature
// http://www.no1currency.com/?noredirect
var query=window.location.search;
if(query.indexOf("noredirect") == -1 && window.location.href.indexOf('rugby') == -1){
	jQuery.support.cors = true;
    jQuery.getJSON("//ukfxms.fexco.com/ipGeoLocation",function(result){
        if(result.countryCode === 'IE'){
			window.location.pathname?window.location.pathname:"";
			//Tests
			//var location=window.location.pathname.replace("/number1","");
			// Prod
			var location=window.location.pathname;
            window.location.replace("http://www.no1currency.ie"+ location + window.query);
        }      
    });
}