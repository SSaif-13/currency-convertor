import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";

//the base URL for the exchange rate API
const BASE_URL = "https://api.exchangerate.host/latest";

//Define and initialize state variables using the useState hook
function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]); // Available currency options
  const [fromCurrency, setFromCurrency] = useState(); // Selected 'from' currency
  const [toCurrency, settoCurrency] = useState(); // Selected 'to' currency
  const [exchangeRate, setExchangeRate] = useState(); // Exchange rate
  const [amount, setAmount] = useState(1); // initial amount to convert
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true); // Track if input is in 'from' currency

  // Calculate 'to' and 'from' amounts based on exchange rate and input
  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  // Fetch initial exchange rate data when the component mounts
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        // Extract the first currency from the API data
        const firstCurrency = Object.keys(data.rates)[0];
        // Set state variables with initial data
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        settoCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Fetch exchange rate data when 'fromCurrency' or 'toCurrency' changes
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]); // Dependency array triggers the effect when these variables change

  // Handler for changing 'from' amount input
  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  // Handler for changing 'to' amount input
  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  // Render the component JSX
  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      ></CurrencyRow>
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectCurrency={toCurrency}
        onChangeCurrency={(e) => settoCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      ></CurrencyRow>
    </>
  );
}

export default App;
