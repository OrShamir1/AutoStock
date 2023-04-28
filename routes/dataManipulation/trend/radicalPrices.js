const getTheRadicalPrice = require('./getTheRadicalPrice') 
function radicalPrices(pivotDates, stockData) {
    const radicalNum = [];
    const radArray =[]
    for(let trend of pivotDates) {
        let wantedWeekData = stockData.findIndex(s => s.datetime == trend.date)
        let theNumIndex = getTheRadicalPrice(wantedWeekData, trend.trend, stockData)
        radArray.push(theNumIndex)
    }
    const downTrend = radArray.filter(s => s.trend == "down")
    const downPrice = downTrend.map(s => stockData[s.priceIndex].low)
    const upTrend = radArray.filter(s => s.trend == "up")
    const upPrice = upTrend.map(s => stockData[s.priceIndex].high)
    const highPrice = Math.max(...upPrice);
    const lowPrice = Math.min(...downPrice);
    const findHighPriceIndex = upPrice.findIndex(i => i == highPrice);
    const findLowPriceIndex = downPrice.findIndex(i => i == lowPrice);
    const highDataIndex = upTrend[findHighPriceIndex].priceIndex;
    const lowDataIndex = downTrend[findLowPriceIndex].priceIndex;
    const highData = stockData[highDataIndex];
    const lowData = stockData[lowDataIndex];
    return {
        highestPrice: {price: highData.high, date: highData.datetime},
        lowestPrice: {price: lowData.low, date: lowData.datetime}
    }
}
module.exports = radicalPrices