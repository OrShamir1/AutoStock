import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
const LineChart = (props) => {
    const [stockData, setStockData] = useState([[], []])
    const jwtToken = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3005/getstock', {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    }
                })
                const data = await response.json()
                setStockData(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const handleClick = (event) => {
        const symbol = event.target.id
        navigate(`/Stock/${symbol}`);
      };
    return (
        <div>
        {stockData.map(x => <div id={x} className='fav-stock' style={{cursor: "pointer"}} onClick={handleClick}>{x}</div>)}
        </div>
    )
};

export default LineChart;
