function volumeAverage(values, averageNum) {
    let valuesSum = 0
    for(let i = 0; i < averageNum; i++) {
        valuesSum += parseInt(values[i].volume)
    }
    // values.map(v => valuesSum = valuesSum + parseInt(v.volume))
    const averageVolume = valuesSum / averageNum
    return averageVolume
}

module.exports = volumeAverage;