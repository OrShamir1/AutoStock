function emaCreator(values, average) {
    let initialSma = 0;
    const multiplayer = (2 / (1 + average));
    let dayBeforeEma = 0;
    for(let i = (values.length - (average + 1)); i < (values.length - 1); i++) {
        initialSma += parseInt(values[i].close)
    }
    initialSma = initialSma / average
    dayBeforeEma = initialSma;
    for(let i = (values.length - (average + 2)); i >= 0; i--) {
        let EMA =  ((values[i].close) * multiplayer) + (dayBeforeEma * (1 - multiplayer));
        dayBeforeEma = EMA
    }
    return dayBeforeEma
}

module.exports = emaCreator;