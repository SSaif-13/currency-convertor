import React from "react";

/**
 * CurrencyRow component for displaying a currency input row with a select dropdown.
 *
 * @param {Object} props - Component props.
 * @param {string[]} props.currencyOptions - Array of available currency options.
 * @param {string} props.selectCurrency - Currently selected currency.
 * @param {function} props.onChangeCurrency - Function to handle currency selection change.
 * @param {function} props.onChangeAmount - Function to handle amount input change.
 * @param {number} props.amount - Amount value for the input field.
 * @returns {JSX.Element} CurrencyRow component.
 */

// Destructure props to access individual values
export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props;

  // Render the CurrencyRow component JSX
  return (
    <div>
      <input
        type="number"
        className="input"
        value={amount}
        onChange={onChangeAmount}
      ></input>
      <select value={selectCurrency} onChange={onChangeCurrency}>
        {/* Map through currency options and generate <option> elements */}
        {currencyOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
