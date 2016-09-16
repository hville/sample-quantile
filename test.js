'use strict'
var c = require('cotest')
var q = require('./sample-quantile')

var delta = 0.02

function closeTo(a, b) {
	c('<=', Math.abs(a-b), delta)
}

var N = 10000,
		samples = [],
		sorted = []

for (var i=0; i<N; ++i) {	samples[i] = Math.random() }
sorted = samples.slice().sort(function(a,b) { return a-b })

c('single prob', function() {
	c('===', q([1], 0.5), 1 )
	c('===', q([-1], 0.5), -1 )
	c('===', q([10], 0.5), 10 )
	c('===', q([1], 0.1), 1 )
	c('===', q([1], 0), 1 )
	c('===', q([1], 1), 1 )
	c('===', q([1,2], 0.5), 1.5)
})
c('multi plrobs', function() {
	c('{==}', q([1,2], [0, 0.5, 1]), [1, 1.5, 2])
	c('{==}', q([0,1,2,3,4,5,6], [0.25, 0.5, 0.75]), [1,3,5])
})
c('samples to be sorted', function() {
	c('===', q([3, 1, 2], 1, true), 3)
})
c('large sorted array', function() {
	closeTo( q(sorted, 0.5), 0.5)
	closeTo( q(sorted, 0.9), 0.9)
	closeTo( q(sorted, 0.1), 0.1)
})
c('large unsorted array', function() {
	closeTo( q(samples, 0.5, true), 0.5)
	closeTo( q(samples, 0.9, true), 0.9)
	closeTo( q(samples, 0.1, true), 0.1)
})
