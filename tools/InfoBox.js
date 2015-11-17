define([], function() {
	var InfoBox = function InfoBox(map) {
		google.maps.OverlayView.call(this, map);
		var opts = {};
		this.offsetVertical_ = opts.offsetVertical || -145;
		this.offsetHorizontal_ = opts.offsetHorizontal || -160;
		this.height_ = opts.height || 80;
		this.width_ = opts.width || 266;
		this.map_ = map;
	};

	/*
	 * InfoBox extends GOverlay class from the Google Maps API
	 */
	InfoBox.prototype = new google.maps.OverlayView();

	InfoBox.prototype.update = function(latlng, content) {
		this.latlng_ = latlng;
		this.content_ = content;
		this.setMap(this.map_);
	};

	/*
	 * Creates the DIV representing this InfoBox
	 */
	InfoBox.prototype.remove = function() {
		if (this.div_) {
			this.div_.parentNode.removeChild(this.div_);
			this.div_ = null;
		}
	};
	
	InfoBox.prototype.removeInfoBox = function() {
		 this.setMap(null);
	};
	

	/*
	 * Creates the DIV representing this InfoBox @param {GMap2} map The map to add
	 * infobox to
	 */
	InfoBox.prototype.panes_changed = function() {
		if (this.div_) {
			this.div_.parentNode.removeChild(this.div_);
			this.div_ = null;
		}

		var panes = this.get('panes');

		if (panes) {
			// Create the DIV representing our Bar
			var div = this.div_ = document.createElement("div");
			div.style.border = "0px none";
			div.style.position = "absolute";
			div.style.background = "url('./images/window.png')";
			div.style.paddingTop = "12px";
			div.style.width = this.width_ + "px";
			div.style.height = this.height_ + "px";
			var contentDiv = document.createElement("div");
			contentDiv.style.paddingTop = "15px";
			contentDiv.style.paddingLeft = "15px";
			contentDiv.innerHTML = this.content_;
			div.appendChild(contentDiv);
			this.draw();

			// Then add this overlay to the DOM
			panes.floatPane.appendChild(div);
		}
	};

	/*
	 * Redraw the Bar based on the current projection and zoom level
	 */
	InfoBox.prototype.draw = function() {
		if (!this.div_) {
			return;
		}

		// Calculate the DIV coordinates of two opposite corners of our bounds to
		// get the size and position of our Bar
		var pixPosition = this.getProjection().fromLatLngToDivPixel(this.latlng_);
		if (!pixPosition){
			return;
		}

		// Now position our DIV based on the DIV coordinates of our bounds
		this.div_.style.width = this.width_ + "px";
		this.div_.style.left = (pixPosition.x + this.offsetHorizontal_) + "px";
		this.div_.style.height = this.height_ + "px";
		this.div_.style.top = (pixPosition.y + this.offsetVertical_) + "px";
		this.div_.style.display = 'block';

		// if we go beyond map, pan map
		var mapWidth = this.map_.getDiv().offsetWidth;
		var mapHeight = this.map_.getDiv().offsetHeight;
		var bounds = this.map_.getBounds();
		var boundsSpan = bounds.toSpan();
		var longSpan = boundsSpan.lng();
		var latSpan = boundsSpan.lat();
		var degWidth = (this.width_ / mapWidth) * longSpan;
		var degHeight = (this.height_ / mapHeight) * latSpan;

		if (this.latlng_.lng() + degWidth > bounds.getNorthEast().lng()) {
			this.map_.setCenter(this.latlng_);
		}
		var bottompt = new google.maps.LatLng((this.latlng_.lat() - degHeight),
				this.latlng_.lng());
		if (!bounds.contains(bottompt)) {
			this.map_.setCenter(this.latlng_);
		}
	};
	
	return InfoBox;
});
