function Application() {
	this.Ground = new EventEmitter;
	
}
Application.prototype.Outgoing = function(That) {
	var Sow = Mechanism.Entrance(That);
	return Sow;
}
Application.prototype.Incoming = function(That) {
	var Sow = Mechanism.Entrance(That);
	this.Ground.Wait(Sow['Entrant'], Sow);
	// Communicate with Server
}


var Alignment = {
	'Entrance': function(Absolute) {
		yieldTerm('Internal', Absolute) || yieldTerm('External', Absolute);

		// Back to Mechanism from here
	},
	'Shed': function(Side) {
		shedTerm('Relative', Side) || shedTerm('Extended', Side);

		Cognizant.Shed(Side);
	}
}

var Connected = {
	'Entrance': function(Controls) {
		yieldTerm('Forth', Controls) || yieldTerm('Respond', Controls)
			|| yieldTerm('Set', Controls);

		Alignment.Entrance(Controls);
	},
	'Shed': function(With) {
		// check type of selector: if function call, otherwise return verbatim
		shedTerm('With', With) || shedTerm('Correspond', With) || shedTerm('See', With);

		Alignment.Shed(With);
	}
}

var Cognizant = {
	'Entrance': function(Transfer) {
		yieldTerm('Keep', Transfer) || yieldTerm('Pass', Transfer)
			|| yieldTerm('Down', Transfer) || yieldTerm('Up', Transfer);

		Connected.Entrance(Transfer);
	},
	'Shed': function(Call) {
		shedTerm('Seed', Call) || shedTerm('Than', Call) || shedTerm('Fall', Call) || shedTerm('Be', Call);

		Operative.Shed(Call);
	}
}

var Operative = {
	'Entrance': function(Platform) {
		yieldTerm('Use', Platform) || yieldTerm('Notify', Platform) || yieldTerm('Switch', Platform);

		Cognizant.Entrance(Platform);
	},
	'Shed': function(Form) {
		shedTerm('Grow', Form) || shedTerm('For', Form) || shedTerm('Complete', Form);

		Dimension.Shed(Form);
	}
}

var Dimension = {
	'Entrance': function(Identity) {
		yieldTerm('Connect', Identity) || yieldTerm('Reconnect', Identity);

		Operative.Entrance(Identity);
	},
	'Shed': function(Gain) {
		shedTerm('Qualify', Gain) || shedTerm('Residence', Gain);

		Mechanism.Shed(Gain);
	}
}

var Mechanism = {
	'Entrance': function(Autonomy) {

		if (Autonomy['Cognize']) {

			// Start fresh
		  	Autonomy['Yield'] = {};
		  	Autonomy['ent'] = [];

			// Down the Rabbit-hole.
		    Dimension.Entrance(Autonomy);
			// Assert: All Entrances in chain have filled Autonomy[Yield], and appointed Autonomy[ent]

		    function Sow(E) {
				Autonomy['Event'] = E;
				Connected.Shed(Autonomy);
			}

			// Create Entrant field
			Autonomy['Yield']['Entrant'] = Sow['Entrant'] = hex_md5(JSON.stringify(Autonomy['ent']));

			return Sow;

		} else if (Autonomy['Entrant']) {

//			Mechanism.Evoker.Lift(Autonomy['Entrant'], Autonomy);

			return true;

		} else if (Autonomy['Z']) {
		
		}

	},
	'Shed': function(Base) {
/*
		Base['that'];
		Base['restore'];
		Base['know'];
		// Socket send Cel here
*/
	}

} // Mechanism.Evoker = new Evoker;

function yieldTerm(T, That) {
	if (That[T]) {
		That['Yield'][T] = That[T];
		var O = {}; O[T] = That[T];
		That['ent'].push(O);
		return true;
	}
	return false;
}

function shedTerm(T, That) {
	if (That[T]) {
		That['Yield'][T] = (typeof That[T] === 'function') ? That[T](That) : That[T];
		return true;
	}
	return false;
}
