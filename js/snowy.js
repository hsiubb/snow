
var snowing = function() {
	var snowflakes = [];

	var snowZone = {
	    canvas : document.getElementById("snow_box"),
	    start : function() {
					this.wind = 1;
					this.wind_next = 1;
	        this.canvas.width = window.document.body.offsetWidth;
	        this.canvas.height = window.document.body.offsetHeight;
					this.frameNo = 0;
	        this.context = this.canvas.getContext("2d");
	        this.interval = setInterval(updateSnowZone, 20);
	    },
			clear : function() {
				this.frameNo += 1;
				this.context.fillStyle = '#123';
				this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
				this.context.font = '22px Arial';
				this.context.fillStyle = '#fff';
				this.context.fillText('风向：' + snowZone.wind_next + (snowZone.wind_next >= 0 ? (snowZone.wind_next >= 2 ? ' >>' : ' >') : (snowZone.wind_next <= -2 ? ' <<' : ' <')), 20, 40);
			},
			stop: function() {
				clearInterval(this.interval);
			}
	}

	function Snowflakes() {
		this.endX = snowZone.canvas.width;
		this.endY = snowZone.canvas.height;
		this.x = this.endX * Math.random().toFixed(3);
		this.y = this.endY * Math.random().toFixed(3);
		this.speedY = Number(this.endX/1200 * Math.random().toFixed(3)) + 1;
		this.radius = Math.floor(9 * Math.random()) / 2 + 1;
		this.context = snowZone.canvas.getContext("2d");
		this.update = function() {
			this.x += snowZone.wind;
			this.y += this.speedY;
			if(this.y >= this.endY) {
				this.y = 0;
				this.x = this.endX * Math.random().toFixed(3);
			}
			if(this.x <= 0) {
				this.x = this.endX;
				this.y = this.endY * Math.random().toFixed(3);
			} else if(this.x >= this.endX) {
				this.x = 0;
				this.y = this.endY * Math.random().toFixed(3);
			}
			this.context.beginPath();
			this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true); //Math.PI*2是JS计算方法，是圆
			this.context.closePath();
			this.context.fillStyle = '#fff';
			this.context.fill();
		}
	}

	function everyinterval(n) {
		if((snowZone.frameNo / n) % 1 == 0) {
			snowZone.wind_before = snowZone.wind_next;
			snowZone.wind_next = (Math.floor(4*Math.random() - 2).toFixed(3));
			return true;
		}
		return false;
	}

	function updateSnowZone() {
		snowZone.clear();

		if(snowZone.frameNo == 1 || everyinterval(800)) {
			if(snowZone.wind_next == snowZone.wind) {
				snowZone.wind_next = Number((4*Math.random() - 2).toFixed(3));
			}
			if((snowZone.wind - snowZone.wind_before) > 2 ) {
				snowZone.wind = snowZone.wind_before + 2;
			} else if((snowZone.wind - snowZone.wind_before) < -2){
					snowZone.wind = snowZone.wind_before - 2;
			}
		}
		if(snowZone.wind_next - snowZone.wind >= .05) {
			snowZone.wind += .05;
		} else if(snowZone.wind_next - snowZone.wind < .05) {
			snowZone.wind -= .05;
		}
		for(var i=0; i<snowflakes.length; i++) {
			snowflakes[i].update();
		}
	}

	function get_snowflakes() {
	    snowZone.start();
			for(var i=0; i<300; i++) {
				snowflakes[i] = new Snowflakes();
			}
	}

	document.onmousemove = function(ev) {
		ev = ev || window.event;
		var x = Number(ev.pageX || ev.clientX + document.body.scrollLeft - document.body.clientLeft);
		var half_x = window.document.body.offsetWidth / 2;
		snowZone.wind_before = (Number(snowZone.wind) || 0).toFixed(3);
		snowZone.wind_next = Number((4 * x / half_x - 4).toFixed(3));
	}
	get_snowflakes();
}();
