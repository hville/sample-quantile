<!-- markdownlint-disable MD004 MD007 MD010 MD041	MD022 MD024	MD032 MD036 -->
# sample-quantile

*find the sample value(s) for one or many probabilities*

• [Introduction](#Introduction) • [API](#API) • [Utilities](#Utilities) • [License](#license) •

```javascript
var quartiles = sampleQuantile([0,1,2,3,4,5,6], [0.25, 0.5, 0.75]) // [1,3,5]
var minimum = sampleQuantile([2, 4, 6, 8], 0) // 2
var maximum = sampleQuantile([2, 4, 6, 8], 1) // 8
var median = sampleQuantile([1, 2], 0.5) // 1.5
var unsortedMax = = sampleQuantile([3, 1, 2], 1, true) // 3
```

## Introduction

There are a number of npm packages to help derive the quantile or percentile values from a sample set with different assumptions and limitations.
This implementation is based on the following:
* only works with probabilities between and including 0 and 1
* In-between probabilities are interpolated ([R-6 presented here](http://en.wikipedia.org/wiki/Quantile) and [discussed here](https://en.wikipedia.org/wiki/Talk:Quantile))
* works with single probability to return a single value
* works with arrays of probabilities to return an array of values
* samples are not sorted by default to prevent overhead, but can be sorted if specified

## API

`sampleQuantile(arrayOfSamples, singleOrManyProbabilities[, sortFirst]) // --> singleOrManyValues`

* `arrayOfSamples` is an array of sorted samples. If unsorted, set the `sortFirst` flag to true
* `singleOrManyProbabilities` single probability number (`0 <= x <= 1`) or an array of numbers
* `sortFirst` optional flag to duplicate and sort the data first. The source of samples remains unchanged

## Utilities

When performance is important, the subfunctions for single numbers and for arrays can be called directly to avoid the internal checks:

`require('sample-quantile/quantile')(samples, probability) : number`
`require('sample-quantile/quantiles')(samples, probabilities) : Array<number>`

## License

Released under the [MIT License](http://www.opensource.org/licenses/MIT)
