function Time(url) {

	var S = null;
	var C = false;
	var cTimeout = 5000;
	var cFirst = true;
	var cTimer = null;
	var rHandler = function(M) {
		alert(JSON.stringify(M));
	}

	function Connect(H) {
		if (!C) {
			console.log("Attempting connection...");
			S = new WebSocket(url);
			S.onopen = function(E) {
				C = true;
				clearTimeout(cTimer);
				cFirst = true;
				console.log('Connected to ' + url);
				S.onmessage = rHandler;
				H(true);
			}

			function Fault(E) {
				C = false;
				clearTimeout(cTimer);
				cTimer = setTimeout(function() { Connect(H); }, cTimeout);
				if (cFirst) {
					console.log('Disconnected');
					cFirst = false;
					H(false);
				}
			}

			S.onclose = Fault;
			S.onerror = Fault;

		} else {
			console.log("Already connected.");
//			H();
		}
	}

	function Disconnect() {
		console.log("Disconnected");
		clearTimeout(cTimer);
	    S.onclose = function () {}; // disable onclose handler
	    S.onerror = function () {}; // disable onerror handler
	    S.close();
		C = false;
		cFirst = true;
	}

	function Send(T, That) {
		if (C) {
			var M = {T: That};
			S.send(JSON.stringify(M));
			return true;
		} else {
			return false;
		}
	}

	Time.Receive = function(H) {
		rHandler = function(M) {
			H(M);
		}
	}

	Time.Now = function(M) { Send('Now', M); }
	Time.Present = function(M) { Send('Present', M); }
	Time.Any = function(M) { Send('Any', M); }
	Time.Will = function(M) { Send('Will', M); }
	Time.Lack = function(M) { Send('Lack', M); }
	Time.Onlock = function(H) {
		Connect( function(Y) {
			H(Y);
		});
	}
	Time.Fault = function() {
		Disconnect();
	}

}