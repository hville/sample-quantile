'use strict'
var test = require('tt')
var quant = require('./index')

var t = require('assert')
function closeTo(a, b, delta) { if (Math.abs(a-b) > Math.abs(delta)) t.fail(a,b,null,'=~') }

var N = 10000
var sum = 0
var smpl = []
for (var i=0; i<N; i++) {
	var rnd = Math.random()
	sum += rnd
	smpl[i] = rnd
}
smpl.sort(function(a,b) { return a-b })

test('invalid input sample', function(t) {
	t.equal( quant([]), undefined )
	t.ok( quant('') instanceof Error )
	t.ok( quant() instanceof Error )
	t.ok( quant(true) instanceof Error )
	t.ok( quant(/\./) instanceof Error )
	t.ok( quant(2) instanceof Error )
	t.equal( quant([1], 1, -1), 1 )
	t.ok( quant([2], -0.1) instanceof Error )
	t.ok( quant([2], 1.1) instanceof Error )
	t.end()
})

test('single input', function(t) {
	t.equal( quant([1]), 1 )
	t.equal( quant([-1]), -1 )
	t.equal( quant([10]), 10 )
	t.equal( quant([1], 0.1), 1 )
	t.equal( quant([1], 0), 1 )
	t.equal( quant([1], 1), 1 )
	t.equal( quant([1], 1, 5), 1 )
	t.equal( quant([1], 1, 7), 1 )
	t.equal( quant([1], 1, 8), 1 )
	t.equal( quant([1], 1, 9), 1 )
	t.end()
})

test('large array', function(t) {
	closeTo( quant(smpl), 0.5, 0.01 )
	closeTo( quant(smpl, 0.9), 0.9, 0.01 )
	closeTo( quant(smpl, 0.1), 0.1, 0.01 )
	closeTo( quant(smpl, 0.1, 5), 0.1, 0.01 )
	closeTo( quant(smpl, 0.1, 7), 0.1, 0.01 )
	closeTo( quant(smpl, 0.1, 8), 0.1, 0.01 )
	closeTo( quant(smpl, 0.1, 9), 0.1, 0.01 )
	t.end()
})
