import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const WeeklyLineChart = (props) => {
    const [stockData, setStockData] = useState([[], []])
    const [dates, setDates] = useState([])
    const [values, setValues] = useState([])
    const symbol = props.symbol

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1week&outputsize=100&apikey=34fd4fb73a0247f297de75d01868e7f2`)
          const stockData = await response.json()
          const datesArr = []
          const valuesArr =[]
          stockData.values.forEach(d => {
            datesArr.unshift(d.datetime)
            valuesArr.unshift(d.close)
          })
          setDates([datesArr])
          setValues([valuesArr])
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
                label: 'Weekly Chart',
                data: values[0],
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    return <Line data={data} style={{display: "inline", height: "40%", width: "40%"}} />;
};

export default WeeklyLineChart;
