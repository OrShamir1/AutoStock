// const express = require('express')
// const router = express.Router()
// const axios = require('axios');
// const volumeAverage = require('./dataManipulation/Volume');
// const currentTrend = require('./dataManipulation/trend/currentTrend')
// const trendChangeIdentifier = require('./dataManipulation/trend/trendChangeIdentifier')


// const Stocks = require('../dist/modules/StockModule');

// router.get(`/ema/:stockSymbol/:interval`, function (req, res) {
//     const stockSymbol = req.params.stockSymbol
//     const interval = req.params.interval
//     axios({
//         method: 'GET',
//         url: `https://api.twelvedata.com/ema?symbol=${stockSymbol}&interval=${interval}&apikey=34fd4fb73a0247f297de75d01868e7f2`,
//     }).then(function(res) {
//         console.log(res.data.values[0].ema);
//         const newStock = new Stocks ({name: stockSymbol, interval: interval, info:res.data})
//         newStock.save()
//     })
//     res.send("Saved")
// })

// router.get(`/sma/:stockSymbol/:interval`, function (req, res) {
//     const stockSymbol = req.params.stockSymbol
//     const interval = req.params.interval
//     axios({
//         method: 'GET',
//         url: `https://api.twelvedata.com/sma?symbol=${stockSymbol}&interval=${interval}&apikey=34fd4fb73a0247f297de75d01868e7f2`,
//     }).then(function(res) {
        
//         const newStock = new Stocks ({name: stockSymbol, interval: interval, info:res.data})
//         newStock.save()
//         console.log(res.data.values[0].sma);
//     })
//     res.send("Saved")
// })

// router.get(`/volumeData/:stockSymbol/:interval`, function (req, res) {
//     const stockSymbol = req.params.stockSymbol
//     const interval = req.params.interval
//     axios({
//         method: 'GET',
//         url: `https://api.twelvedata.com/time_series?symbol=${stockSymbol}&interval=${interval}&outputsize=100&apikey=34fd4fb73a0247f297de75d01868e7f2`,
//     }).then(function(res) {
//         const newStock = new Stocks ({name: stockSymbol, interval: interval, info:res.data})
//         newStock.save()
//         const values = res.data.values
//         const averageVolume = volumeAverage(values, 10)
//         const trendIndicator = currentTrend(values)
//         const RoughPivotDates = trendChangeIdentifier(trendIndicator)
//         console.log(RoughPivotDates);
//     })
//     res.send("Saved")
// })

// router.get(`/data/:stockSymbol/:interval`, function (req, res) {
//     const stockSymbol = req.params.stockSymbol
//     const interval = req.params.interval
//     axios({
//         method: 'GET',
//         url: `https://api.twelvedata.com/time_series?symbol=${stockSymbol}&interval=${interval}&outputsize=12&apikey=34fd4fb73a0247f297de75d01868e7f2`,
//     }).then(function(res) {
//         console.log(res.data.values[0].ema);
//         const newStock = new Stocks ({name: stockSymbol, interval: interval, info:res.data})
//         newStock.save()
//     })
//     res.send("Saved")
// })

// module.exports = router



