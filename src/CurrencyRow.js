import React from 'react';

export default function CurrencyRow({
  currencyOptions,
  selectedCurrency,
  onCurrencyChange,
  amount,
  onChangeAmount,
}) {
  return (
    <div className='group'>
      <input
        className='input'
        type='number'
        value={isNaN(amount) ? 0 : Number(parseFloat(amount).toFixed(2))}
        
        onChange={onChangeAmount}
      />
      <select value={selectedCurrency} onChange={onCurrencyChange}>
        {currencyOptions.map((option, index) => (
          <option value={option} key={option + index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
