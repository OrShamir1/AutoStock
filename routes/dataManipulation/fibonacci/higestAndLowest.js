function highestAndLowest(radicalPoints) {
    let highestPrice = {price: 0, date: null};
    let lowestPrice = {price: radicalPoints[0].price, date: radicalPoints[0].date};
    
    for(let price of radicalPoints) {
        if(price.trend == "down" && highestPrice.price < price.price) {
            highestPrice.price = price.price;
            highestPrice.date = price.date;
        }
        if(price.trend == "up" && lowestPrice.price > price.price) {
            lowestPrice.price = price.price;
            lowestPrice.date = price.date;
        }
    }
    return {
        highestPrice: highestPrice,
        lowestPrice: lowestPrice
    }
}
module.exports = highestAndLowest;