import React from 'react';
import LineChart from './charts/LineChart';
import WeeklyLineChart from './charts/WeeklyChart';
import VerticalBarChart from './charts/VerticalBarChart';
import { useParams } from 'react-router-dom';

const StockPage = (props) => {
  let { symbol } = useParams();
  return (
    <div>
      <div className='timeCharts'>
        
        <div style={{ width: "40em", height: "40em", display: "inline" }}>
        <h4>Monthly Chart</h4>
          <LineChart symbol={symbol} />
        </div>
        <div style={{ width: "40em", height: "40em", display: "inline" }}>
        <h4>Weekly Chart</h4>
          <WeeklyLineChart symbol={symbol} />
        </div>
      </div>
      <VerticalBarChart symbol={symbol} />
    </div>
  )
};

export default StockPage;
