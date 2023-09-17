import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";

const BASE_URL = "https://api.exchangerate.host/latest";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, settoCurrency] = useState();

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        settoCurrency(firstCurrency);
      });
  }, []);

  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
      ></CurrencyRow>
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectCurrency={toCurrency}
        onChangeCurrency={(e) => settoCurrency(e.target.value)}
      ></CurrencyRow>
    </>
  );
}

export default App;
