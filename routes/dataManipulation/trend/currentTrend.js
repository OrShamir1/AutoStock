function currentTrend(stockData) {
    const trendData = [];
    const stockDataLength = stockData.length - 1
    let priceFromBefore = stockData[stockDataLength].close;
    for(let weeklyData = stockDataLength - 1; weeklyData >= 0; weeklyData--) {
        let currentPrice = stockData[weeklyData].close
        if(priceFromBefore < currentPrice) {
            trendData.push({date: stockData[weeklyData].datetime, trend: "up"})
            priceFromBefore = currentPrice
        }
        else if(priceFromBefore > currentPrice) {
            trendData.push({date: stockData[weeklyData].datetime, trend: "down"})
            priceFromBefore = currentPrice
        }
    }
    return trendData
}

module.exports = currentTrend;