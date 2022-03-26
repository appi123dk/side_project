import {useState, useEffect} from "react";

function Coin(){

  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [dollar, setDollar] = useState(1);
  const [selCoin, setSelCoin] = useState([]);
  const [coinPrice, setCoinPrice] = useState(0);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=10")
    .then((response) => response.json())
    .then((json) => {
      setCoins(json);
      setLoading(false);
    });
  }, [])

  useEffect(() => {
    setCoinPrice(dollar/selCoin[1])
  }, [dollar, selCoin]);

  function onChange(e){
    setDollar(e.target.value);
  }

  function changeCoin(e){
    const coinSymbol = e.target.selectedOptions[0].dataset.symbol;
    const coinPrice = parseFloat(e.target.selectedOptions[0].dataset.price);

    setSelCoin([coinSymbol, coinPrice]);
  }


  return (
    <div>
      <h1>Coin Tracker!</h1>
      {loading ? <strong>Loading...</strong> : (
        <select onChange={changeCoin}>
          <option>원하는 코인을 선택하세요</option>
          {coins.map((coin) => 
            <option key={coin.id} data-symbol={coin.symbol} data-price={coin.quotes.USD.price}>{coin.name} : {coin.quotes.USD.price} USD</option>
          )}
        </select>
      )}
      <br/>
      <h3>환전</h3>
      $ : <input type="number" onChange={onChange} value={dollar}/> 
      <p> Result : {coinPrice} {selCoin[0]}</p>
    </div>
  )
}

export default Coin;