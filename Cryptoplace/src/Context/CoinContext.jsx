import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$"
  });

  const fetchAllCoin = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch coins");
      const data = await response.json();
      setAllCoin(data); // Update state
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  };
useEffect(()=>{
    fetchAllCoin();
},[currency])

  const contextValue = {
    allCoin,
    currency,
    setCurrency,
    fetchAllCoin
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
