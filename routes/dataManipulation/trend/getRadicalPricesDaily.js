function getRadicalPricesDaily (values, days) {
    let lowestPrice = {price: values[0].low, date: values[0].datetime};
    let highestPrice = {price: 0, date: null};
    let lowPrice = values[0].low
    let highPrice = 0 ; 
    for(let i = 0; i <= days; i++) {
        if(lowPrice > values[i].low) {
            lowPrice = values[i].low;
        }
        if(highPrice < values[i].high) {
            highPrice = values[i].high
        }
    }
    return {lowestPrice: lowPrice, highestPrice: highPrice}
}
module.exports = getRadicalPricesDaily;