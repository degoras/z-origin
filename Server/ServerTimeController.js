var hex_md5 = require('./md5-module-min.js');

function ServerTimeController(port) {
	var self = this;
	self.live = false;

    var fs = require('fs');

	var ws_cfg = {
	  ssl: true,
	  port: 5000,
	  ssl_key: './server.key',
	  ssl_cert: './server.crt'
	};

	var processRequest = function(req, res) {
	    console.log("Request received.")
	};

	var httpServ = require('https');
	var app = null;

	app = httpServ.createServer({
	  key: fs.readFileSync(ws_cfg.ssl_key),
	  cert: fs.readFileSync(ws_cfg.ssl_cert)
	}, processRequest).listen(ws_cfg.port);

	//var WebSocketServer = require('ws').Server, ws_server = new WebSocketServer(ws_cfg);

	var WebSocketServer = require('ws').Server, wss = new WebSocketServer( {server: app});


//	var WebSocketServer = require('ws').Server
//		, wss = new WebSocketServer({host: '192.168.1.100', port: port});
	wss.on('connection', function(websocket) {
		self.websocket = websocket;
		self.websocket.on('close', fault);
		self.websocket.on('message', handleMessage);
//		self.websocket.on('error', error);
	});

	function fault(message) {
		console.log("Disconnected");
		self.live = false;
	}

	function handleMessage(msg) {
		var msgObj = JSON.parse(msg);
		
		console.log(msgObj);
		var tm = msgObj.time;
		switch (tm) {
			case 'Now':
				self.Now(msgObj.choice);
				break;
			case 'Present':
				self.Present(msgObj.choice);
				break;
			case 'Any':
				self.Any(msgObj.choice);
				break;
			case 'Will':
				self.Will(msgObj.choice);
				break;
			case 'Lack':
				self.Lack(msgObj.choice);
				break;
			case 'Onlock':
				self.Onlock(msgObj.choice);
				break;
			case 'Fault':
				self.Fault(msgObj.choice);
				break;
			default:
				console.log('unknown time');
				break;
		}
	}

	function createKey() {
		var d = new Date;
		var n = d.getTime();
		var x =  hex_md5(n.toString());
		return x;
	}
	
	self.Onlock = function(choice) {
		this.live = true;
		var time = {'time':choice.my}
		var device_id = choice.me;
		if (device_id == '' || device_id == null || device_id == undefined) {
			console.log('creating device ID');
			device_id = createKey();
		}
		time.device_id = device_id;
		self.websocket.device_id = device_id;

		console.log('received choice: ' + JSON.stringify(choice));
		if (self.live) self.websocket.send( JSON.stringify(time) );
	}


}

ServerTimeController.prototype.Now = function(choice) {
	var time = { time: "Now", choice: choice };
//	if (this.live) this.websocket.send(JSON.stringify(time));
	if (this.live) this.websocket.send(JSON.stringify({time: time.choice.my, message: 'Nothing but Now...'}));
}

ServerTimeController.prototype.Present = function(choice) {
	var time = { time: "Present", choice: choice };
	if (this.live) this.websocket.send(JSON.stringify(time));
}

ServerTimeController.prototype.Any = function(choice) {
	var time = { time: "Any", choice: choice };
	if (this.live) this.websocket.send(JSON.stringify(time));
}

ServerTimeController.prototype.Will = function(choice) {
	var time = { time: "Will", choice: choice };
	if (this.live) this.websocket.send(JSON.stringify(time));
}

ServerTimeController.prototype.Lack = function(choice) {
	var time = { time: "Lack", choice: choice };
	if (this.live) this.websocket.send(JSON.stringify(time));
}

module.exports = ServerTimeController;