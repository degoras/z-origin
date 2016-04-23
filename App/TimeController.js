function TimeController(url) {

	var self = this;
	var connected = false;
	var connTimeout = 5000;
	var connTimer = null;
	var timekeeper = new EventEmitter;
	var websocket;
	connect();

	function connect() {
		if (!connected) {
			console.log("Attempting connection...");
			websocket = new WebSocket(url);
			websocket.onopen = onlock;
			websocket.onclose = fault;
			websocket.onmessage = handleMessage;
		} else {
			console.log("Already connected.");
		}
	}

	function onlock() {
		connected = true;
		clearTimeout(connTimer);
		console.log('Connected');
		self.getTime('Onlock')({}, function(message) {
			console.log("Setting device ID");
			self.setDeviceId(message.device_id);
		});
	}

	function fault() {
		connected = false;
		console.log('Disconnected');
		// reconnect
		connTimer = setTimeout(connect, connTimeout);
	}

	self.getTime = function(time) {
		var timeKey = time;
		var timeFn = function(choice, callback) {
			choice.me = getDeviceId();
			choice.my = createKey();
			sendMessage({time:timeKey, choice: choice}, callback);
		}
		return timeFn;
	}

	self.setDeviceId = function(value) {
		console.log("Setting cookie: " + value);
		setCookie('device_id',value,20);
	}

	function createKey() {
		var d = new Date;
		var n = d.getTime();
		var x =  hex_md5(n.toString());
		return x;
	}
	function getDeviceId() {
		return getCookie('device_id');
	}

	function handleMessage(message) {
		var msgData = JSON.parse(message.data);
//		console.log(msgData);
		var time = msgData.time;
		timekeeper.emit(time, msgData);		
	}

	function sendMessage(message, callback) {
		if (connected) {
			var timeKey = message.choice.my;
			timekeeper.once(timeKey, callback);
			websocket.send(JSON.stringify(message));
			return true;
		} else {
			console.log("Not connected")
			return false;
		}
	}
}
