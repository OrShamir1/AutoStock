import React from 'react';
import LineChart from './charts/LineChart';
import WeeklyLineChart from './charts/WeeklyChart';
import VerticalBarChart from './charts/VerticalBarChart';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StockPage = (props) => {
  let { symbol } = useParams();
  const THESYMBOL = symbol
  const handleClick = function (symbol) {
    const token = localStorage.getItem('token');
    const data = {symbol: THESYMBOL};
    const url = `http://localhost:3005/addtosstock`
    function postWithJWT(url, data, token) {
        return axios.post(url, data, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      postWithJWT(url, data, token).then(x => console.log(x))
      
}
  return (
    <div>
      <button onClick={handleClick}>Add To Fav</button>
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
