function trendChangeIdentifier(trendData) {
    const pivotDates = [];
    const endPoint = trendData.length - 3;
    let currentTrend = null
    for(let trendDataIndex in trendData) {
        const trendDataIndexParsed= parseInt(trendDataIndex)
        if(trendData[trendDataIndexParsed].trend !== currentTrend &&
            trendDataIndexParsed < endPoint &&
            trendData[trendDataIndexParsed].trend !== trendData[trendDataIndexParsed + 1].trend &&
            trendData[trendDataIndexParsed + 1].trend == trendData[trendDataIndexParsed + 2].trend) {
            pivotDates.push(trendData[trendDataIndexParsed]);
            currentTrend = trendData[trendDataIndexParsed].trend
        }  
    }
    return pivotDates
}
module.exports = trendChangeIdentifier;