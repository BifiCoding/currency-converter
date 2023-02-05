import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import CurrencyRow from './CurrencyRow';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;

  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    axios.get(`https://api.exchangerate.host/latest`).then(response => {
      setCurrencyOptions([
        response.data.base,
        ...Object.keys(response.data.rates),
      ]);
      const dolar = Object.keys(response.data.rates)[149];
      setFromCurrency(response.data.base);
      setToCurrency(dolar);
      setExchangeRate(response.data.rates[dolar]);
    });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      axios
        .get(
          `https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toAmount}`
        )
        .then(response => {
          setExchangeRate(response.data.rates[toCurrency]);
        });
    }
  }, [fromCurrency, toCurrency]);

  const handleFromAmountChange = e => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  };

  const handleToAmountChange = e => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  };

  return (
    <>
      <div className='content-bg'>
        <div style={{ marginBottom: 25 }}>
          <span className='headline'>Currency Convert</span>
        </div>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onCurrencyChange={e => setFromCurrency(e.target.value)}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
        
        />
        <h1>=</h1>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onCurrencyChange={e => setToCurrency(e.target.value)}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
        />
        <div style={{ marginTop: 50 }}>
          <span className='description'>
            Find out the current exchange rate at any moment
          </span>
        </div>
      </div>
    </>
  );
}

export default App;
