const axios = require('axios')


const lowTides = function (stockData) {
    const lowTides = []
    let lowestData = stockData[0].low
    for(let data of stockData) {
        if(data.low < lowestData) {
            lowTides.push(data.low)
        }
    }
    console.log(lowTides);
    return lowTides
}

const getStockData = function () {
    symbol = "aapl"
    axios({
        method: 'GET',
        url: `http://localhost:3000/findData/${symbol}`,
    }).then(function(res) {
        const stockData = res.data[0].info[0].values
        const pivotDates = trendChangeIdentifier(currentTrend(stockData))
        radicalPrices(pivotDates, stockData)
    })
}

const currentTrend = function (stockData) {
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

const trendChangeIdentifier = function (trendData) {
    const pivotDates = [];
    const endPoint = trendData.length - 3;
    let currentTrend = null
    for(let trendDataIndex in trendData) {
        const trendDataIndexParsed= parseInt(trendDataIndex)
        if(trendData[trendDataIndexParsed].trend !== currentTrend && trendDataIndexParsed < endPoint && trendData[trendDataIndexParsed].trend !== trendData[trendDataIndexParsed + 1].trend && trendData[trendDataIndexParsed + 1].trend == trendData[trendDataIndexParsed + 2].trend) {
            pivotDates.push(trendData[trendDataIndexParsed]);
            currentTrend = trendData[trendDataIndexParsed].trend
        }  
    }
    return pivotDates
}

const getTheRadicalPrice = function (priceIndex, currentTrend, stockData) {
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

const radicalPrices = function (pivotDates, stockData) {
    const radicalNum = [];
    for(let trend of pivotDates) {
        let wantedWeekData = stockData.findIndex(s => s.datetime == trend.date)
        let theNumIndex = getTheRadicalPrice(wantedWeekData, trend.trend, stockData)
        if(theNumIndex.trend == "up") {
            radicalNum.push({price: stockData[theNumIndex.priceIndex].high, date: stockData[theNumIndex.priceIndex].datetime ,trend:"down"})
        }
        else if(theNumIndex.trend == "down") {
            radicalNum.push({price: stockData[theNumIndex.priceIndex].low, date: stockData[theNumIndex.priceIndex].datetime ,trend:"up"})
        }
    }
    console.log(radicalNum);
}
getStockData()