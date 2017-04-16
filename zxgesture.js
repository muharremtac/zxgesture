'use strict';

Module.register("zxgesture",{

		defaults: {
                width:"500px",
                height:"500px",
			    images:""
		},

		start: function () {
			var self = this;
			var img;

			self.sendSocketNotification("ZXGESTURE_START", self.config);
		},

		socketNotificationReceived: function(notification, payload) {

			if(notification === 'ZXGESTURE' && payload === 'SwipeRight') {
				this.changeImage(-1);
				console.log('**************zxgesture MODULE Swipe Right**********');
			}
			if(notification === 'ZXGESTURE' && payload === 'SwipeLeft') {
				this.changeImage();
				console.log('**************zxgesture MODULE Swipe Left**********');
			}

		},

	getDom: function() {
        this.img = document.createElement("img");
		this.img.src = "https://drscdn.500px.org/photo/119552959/m%3D900/18e7ff6544d219ccbe7286a30276a560";
        this.img.style.width = this.config.width;
		return this.img;
	},

	 changeImage: function(dir) {
		var imgs = this.config.images;
		 if(imgs==="") {
			 imgs=["https://drscdn.500px.org/photo/119552959/m%3D900/18e7ff6544d219ccbe7286a30276a560",
				 "https://drscdn.500px.org/photo/119552953/m%3D900/588aecd4276c0f7fb16113f11a2005df",
				 "https://drscdn.500px.org/photo/115411959/m%3D900/f42989835015fc7f836b62c3c3aea932"];
		 }
		this.img.src = imgs[imgs.indexOf(this.img.src) + (dir || 1)] || imgs[dir ? imgs.length - 1 : 0];
	}


});
