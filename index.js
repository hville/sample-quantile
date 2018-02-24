var quantile = require('./quantile'),
		quantiles = require('./quantiles')

/**
 * Return the quantile(s) for given probabilitie(s) for a sorted array
 * @param	{Array<number>} samples - sorted samples
 * @param	{number|Array<number>} probability - quantile probabilitie(s)
 * @param	{boolean} [sortFirst] - prior sorting required
 * @return {number|Array<number>} - quantile value(s)
 */
module.exports = function(samples, probability, sortFirst) {
	var vs = sortFirst ? samples.slice().sort(asc) : samples
	return Array.isArray(probability) ? quantiles(vs, probability) : quantile(vs, probability)
}
function asc (a, b) {
	return a - b
}
