/* global Module */

/* Magic Mirror
 * Module: MMM-RandomPhoto
*/

Module.register("MMM-RandomPhoto",{
	defaults: {
		opacity: 0.4,
		animationSpeed: 1000,
//		updateInterval: 60,
		url: 'https://picsum.photos/800/480/?random'
	},

	start: function() {
		this.load();
	},

	load: function() {
		var self = this;

		var url = self.config.url + (self.config.url.indexOf('?') > -1 ? '&' : '?') + (new Date().getTime());
		var img = $('<img />').attr('src', url);

		img.on('load', function() {
				$('#photos-placeholder1').attr('src', url).animate({
					opacity: self.config.opacity
				}, self.config.animationSpeed, function() {
					$(this).attr('id', 'photos-placeholder2');
				});

				$('#photos-placeholder2').animate({
					opacity: 0
				}, self.config.animationSpeed, function() {
					$(this).attr('id', 'photos-placeholder1');
				});
		});

//		setTimeout(function() {
//			self.load();
//		}, (self.config.updateInterval * 1000));
		
	},
	
	notificationReceived: function(notification, payload, sender) {
		var self = this;
		if (notification === "CHANGE_BACKGROUND_IMAGE" ) self.load();
	},

	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.innerHTML = '<img id="photos-placeholder1" style="top: 0px; opacity: 0; position: absolute" /><img id="photos-placeholder2" style="top: 0px; opacity: 0; position: absolute" />';
		return wrapper;
	},
	getScripts: function() {
    return [
			this.file('node_modules/jquery/dist/jquery.min.js')
    ]
	}
});
