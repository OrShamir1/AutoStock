function smaCreator(stockData, average) {
    let counter = 0;
    for(let i = 0; i < average; i++) {
        counter += parseInt(stockData[i].close)
    }
    return (counter / average)
}
module.exports = smaCreator