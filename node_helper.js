'use strict';

const NodeHelper = require('node_helper');

var i2c = require('i2c-bus');
var i2c1 = i2c.openSync(1);
const GESTURE_ADDR = 0x10;
const CMD_ACCESS_CONFIG = 0x04;

module.exports = NodeHelper.create({
	
	start: function () {
		const self = this;
		console.log("Starting node helper for: " + self.name);
	},
	
	socketNotificationReceived: function (notification, payload) {
		const self = this;
		this.config = payload;
		
		if (notification === 'GESTURE_START') {    
		 console.log('**************RECEIVING GESTURE_START**********');	
			setInterval(function () {			
				var gesture = i2c1.readByteSync(GESTURE_ADDR, CMD_ACCESS_CONFIG);		
				if(gesture===0x01){
					  self.sendSocketNotification('GESTURE', 'SwipeRight');
				}else if(gesture===0x02){
					  self.sendSocketNotification('GESTURE', 'SwipeLeft');
				}else if(gesture===0x03){
					 self.sendSocketNotification('GESTURE', 'SwipeUp');
				}
				
			},500);
			
		}
	}
});
	