//http://en.wikipedia.org/wiki/Quantile
//https://en.wikipedia.org/wiki/Talk:Quantile

sampleQuantile.single = singleQuantile
sampleQuantile.array = arrayQuantiles
module.exports = sampleQuantile

/**
 * Return the quantile(s) for given probabilitie(s) for a sorted array
 * @param	{array} sortedSamples - sorted samples
 * @param	{number|array} probability - quantile probabilitie(s)
 * @param	{boolean} sortFirst - prior sorting required
 * @return {number|array} - quantile value(s)
 */
function sampleQuantile(sortedSamples, probability, sortFirst) {
	if (sortFirst) sortedSamples = sortedSamples.slice().sort(asc)
	if (Array.isArray(probability)) return arrayQuantiles(sortedSamples, probability)
	return singleQuantile(sortedSamples, probability)
}
function asc (a, b) {
	return a - b
}
/**
 * Return the quantile for given probabilities for a sorted array
 * @param	{array} sorted - sorted samples
 * @param	{array} probs - quantile probabilities
 * @return {array} - quantile values
 */
function arrayQuantiles(sorted, probs) {
	for (var i = 0, arr = Array(probs.length); i < probs.length; ++i) {
		arr[i] = sampleQuantile(sorted, probs[i])
	}
	return arr
}
/**
 * Return the quantile of a given probability for a sorted array
 * @param	{array} sorted - sorted samples
 * @param	{number} prob - quantile probability
 * @return {number} - quantile value
 */
function singleQuantile(sorted, prob) {
	var n = sorted.length,
			h = (n + 1) * prob,
			j = Math.floor(h),
			i = j - 1
	return i < 0 ? sorted[0]
		: j >= n ? sorted[n-1]
		: sorted[i] + (h-j) * (sorted[j] - sorted[i])
}
