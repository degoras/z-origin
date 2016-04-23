function Keys() {
	var firstChild = new Key(this,this,null,null);
	var last = -1;

	function Key(P,C,K,H) {
		this.P = P;
		this.C = C;
		this.K = K;
		this.H = H;
	}

	function Find(K) {
		var C = firstChild;
		while( C.K != last) {
			if (C.K == K) {
				return C;
			// Current is less than K
			} else if ( C.K < K ) {
				// Next
				C = C.C;
			}
			return -1;
		}
	}

	function Insert(K,H) {
		function Next(N) {
			if (N.C == last) {
				return false;
			}
			if (Before(N.K, K) || ) {
				Next(N.C);
			} else {
			}
		}
	}

	function Remove(R) {
	}

	function Before(B, K) {
		return B <= K;
	}

	function After(A, K) {

	}
}
