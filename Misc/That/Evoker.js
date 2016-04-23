function Evoker() {
	this.Weights = {};
}
Evoker.prototype.Wait = function(K, H) {
	this.Weights[K] = H;
	alert(this.Weights[K]);
}
Evoker.prototype.Lift = function(K, O) {
	var keys = Object.keys(this.Weights);
	for(var k in keys) {
		if (k == K) {
			if (typeof this.Weights[k] === 'function')
				this.Weights[k](O);
		}
	}
}
