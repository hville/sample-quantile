'use strict';
//TODO test, JSDOC

//quantile(sortedArray, 0.25)
//http://en.wikipedia.org/wiki/Quantile
var qf = {
  5: function R5(arr, p){ //5 - good behvious but empirical
		var n = arr.length;
    if (p <= (1/2)/n) return arr[0];
    if (p >= (n - 1/2)/n) return arr[n-1];
    var h = n*p + 0.5 - 1;
    var h0 = Math.floor(h);
    return arr[h0] + (h-h0)*(arr[h0+1]-arr[h0]);
  },
  7: function R7(arr, p){ //7 Excel - for the uniform distribution
		var n = arr.length;
    if (p === 1) return arr[n-1];
    var h = (n-1)*p;
    var h0 = Math.floor(h);
    return arr[h0] + (h-h0)*(arr[h0+1]-arr[h0]);
  },
  8: function R8(arr, p){ //8 - median-unbiased for all distributions
		var n = arr.length;
    if (p <= (2/3)/(n+1/3)) return arr[0];
    if (p >= (n-1/3)/(n+1/3)) return arr[n-1];
    var h = (n + 1/3)*p + 1/3 - 1;
    var h0 = Math.floor(h);
    return arr[h0] + (h-h0)*(arr[h0+1]-arr[h0]);
  },
  9: function R9(arr, p){ //9 - for the normal distribution
		var n = arr.length;
    if (p <= (5/8)/(n+1/4)) return arr[0];
    if (p >= (n-3/8)/(n+1/4)) return arr[n-1];
    var h = (n + 1/4)*p + 0.375 - 1;
    var h0 = Math.floor(h);
    return arr[h0] + (h-h0)*(arr[h0+1]-arr[h0]);
  }
};


// PUBLIC
function sampleQuantile(sortedArray, p, r) {
  if (r === undefined || !qf[r]) r = 8; // default method
  if (p === undefined) p = 0.5; // default median
	if (p>1 || p<0) return new Error('quantile probability must be within [0..1]');
  return qf[r](sortedArray, p);
};


module.exports = sampleQuantile;
