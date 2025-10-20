import React, { useContext, useEffect, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../Context/CoinContext';
import LineChart from '../../Components/LineChart/LineChart';

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const { currency } = useContext(CoinContext);
  const [historicalData, setHistoricalData] = useState();

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(response => response.json())
      .then(response => setCoinData(response))
      .catch(err => console.error('Coin Data Error:', err));
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      options
    )
      .then(response => response.json())
      .then(response => setHistoricalData(response))
      .catch(err => console.error('Historical Data Error:', err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  if (coinData && historicalData) {
    return (
      <div className='coin'>
        <div className='coin-name'>
          <img src={coinData.image?.large} alt={coinData.name} />
          <p>
            <b>
              {coinData.name} ({coinData.symbol?.toUpperCase()})
            </b>
          </p>
        </div>
        <div className='coin-chart'>
          <LineChart historicalData={historicalData} />
        </div>
        <div className="coin-info">
          <ul>
            <li>Crpto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>{currency.symbol}{coinData.market_data.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>{currency.symbol}{coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour high</li>
            <li>{currency.symbol}{coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour low</li>
            <li>{currency.symbol}{coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className='spinner'>
        <div className='spin'></div>
      </div>
    );
  }
};

export default Coin;
