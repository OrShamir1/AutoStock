function getTheRadicalPrice(priceIndex, currentTrend, stockData) {
    let nextPriceIndex = priceIndex + 1;
    let beforePriceIndex = priceIndex - 1;
    let nextNextPriceIndex = priceIndex + 2;
    let beforeBeforePriceIndex = priceIndex - 2;
    
    if(currentTrend == "up") {
        let nextPrice = stockData[nextPriceIndex].high
        let beforePrice = stockData[beforePriceIndex].high
        let currentPrice = stockData[priceIndex].high
        const highestNum = Math.max(currentPrice, beforePrice, nextPrice)
        if(highestNum == currentPrice) {
            return {priceIndex: priceIndex, trend:"up"}
        }
        else if(highestNum == beforePrice) {
            return {priceIndex: beforePriceIndex, trend:"up"}
        }
        else if(highestNum == nextPrice) {
            return {priceIndex: nextPriceIndex, trend:"up"}
        }
        
    }
    else if(currentTrend == "down") {
        let nextPrice = stockData[nextPriceIndex].low
        let beforePrice = stockData[beforePriceIndex].low
        let currentPrice = stockData[priceIndex].low
        let lowNum = Math.min(currentPrice, nextPrice, beforePrice)
        if(lowNum == nextPrice) {
            return {priceIndex: nextPriceIndex, trend:"down"}
        }
        else if(lowNum == currentPrice) {
            return {priceIndex: priceIndex, trend:"down"}
        }
        else if(lowNum == beforePrice) {
            return {priceIndex: beforePriceIndex, trend:"down"}
        }
    }
}

module.exports = getTheRadicalPrice;