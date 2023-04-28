function fibonacci(highAndLowPoints) {
        let fibonacciGap = highAndLowPoints.highestPrice.price - highAndLowPoints.lowestPrice.price;
        let firstFib = highAndLowPoints.highestPrice.price - (fibonacciGap * 0.236);
        let secFib = highAndLowPoints.highestPrice.price - (fibonacciGap * 0.5);
        let thirdFib = highAndLowPoints.highestPrice.price - (fibonacciGap * 0.618);
        let forthFib = highAndLowPoints.highestPrice.price - (fibonacciGap * 0.786);
        return {point: highAndLowPoints, firstFib: firstFib, secFib: secFib, thirdFib: thirdFib, forthFib: forthFib}
}

module.exports = fibonacci;