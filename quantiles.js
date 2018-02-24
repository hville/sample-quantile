var quantile = require('./quantile')

/**
 * Return the quantile for given probabilities for a sorted array
 * @param	{Array<number>} sorted - sorted samples
 * @param	{Array<number>} probs - quantile probabilities
 * @return {Array<number>} - quantile values
 */
module.exports = function(sorted, probs) {
	for (var i = 0, arr = Array(probs.length); i < probs.length; ++i) {
		arr[i] = quantile(sorted, probs[i])
	}
	return arr
}
