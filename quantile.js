//http://en.wikipedia.org/wiki/Quantile
//https://en.wikipedia.org/wiki/Talk:Quantile

/**
 * Return the quantile of a given probability for a sorted array
 * @param	{Array<number>} sorted - sorted samples
 * @param	{number} prob - quantile probability
 * @return {number} - quantile value
 */
module.exports = function(sorted, prob) {
	var n = sorted.length,
			h = (n + 1) * prob,
			j = Math.floor(h),
			i = j - 1
	return i < 0 ? sorted[0]
		: j >= n ? sorted[n-1]
		: sorted[i] + (h-j) * (sorted[j] - sorted[i])
}
