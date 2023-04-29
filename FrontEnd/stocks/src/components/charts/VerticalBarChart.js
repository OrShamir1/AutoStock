
import React, { useState, useEffect } from 'react';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

const VerticalBarChart = (props) => {
  const [stockData, setStockData] = useState([[], []])
  const [dates, setDates] = useState([])
  const [sales, setSales] = useState([])
  const [netIncome, setNetIncome] = useState([])
  const symbol = props.symbol

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.twelvedata.com/income_statement?symbol=${symbol}&start_date=2021-01-01&period=quarterly&apikey=34fd4fb73a0247f297de75d01868e7f2`)
        const stockData = await response.json()
        const datesArr = []
        const salesArr = []
        const netIncomeArr = []
        stockData.income_statement.forEach(d => {
          datesArr.unshift(d.fiscal_date)
          salesArr.unshift(d.sales)
          netIncomeArr.unshift(d.net_income)
        })
        setDates([datesArr])
        setSales([salesArr])
        setNetIncome([netIncomeArr])
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const data = {
    labels: dates[0],
    datasets: [
      {
        label: 'Sales',
        data: sales[0],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const netIncomeData = {
    labels: dates[0],
    datasets: [
      {
        label: 'Net Income',
        data: netIncome[0],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>Fundamental Analysis</h1>
      <div id='vertical-charts'>

        <div id='bar' style={{ display: "inline", width: "40em", height: "40em" }}>
          <Bar data={data} />
        </div>
        <div id='net-income' style={{ display: "inline", width: "40em", height: "40em" }}>
          <Bar data={netIncomeData} />
        </div>
      </div>
    </div>
  );
};

export default VerticalBarChart;

