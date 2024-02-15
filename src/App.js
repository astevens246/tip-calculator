import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [bill, setBill] = useState('');
  const [tip, setTip] = useState('10%');
  const [split, setSplit] = useState(1);
  const [splitTotal, setSplitTotal] = useState(0);
  const [tipAmount, setTipAmount] = useState(0);

  function handleTipChange(e){
    let value = e.target.value.replace('%', '');
    if (value.indexOf(value, '%') === -1){
      value += '%';
    }
    setTip(value);
  }
  function handleBillChange(e) { 
    setBill(e.target.value);
  }

  function splitPlus() {
    setSplit(oldValue => oldValue + 1);
  }
  
  function splitMinus() {
    setSplit(oldValue => Math.max(oldValue - 1, 1));
  }

  function calculate(){
    const percentage = (1 + parseInt(tip.replace('%', ''))/ 100);
    const result = (bill * percentage / split).toFixed(2);
    const tipAmount = (bill * parseInt(tip.replace('%', ''))/ 100).toFixed(2);
      
    setSplitTotal(result);
    setTipAmount(tipAmount);
  }
  useEffect(() => {
    calculate();
    // eslint-disable-next-line
  }, [bill, tip, split] );
    return (
      <div>
        <label> Bill total</label>
        <input type="text" placeholder={'0.00'} value={bill} onChange={handleBillChange} />
        <label> Tip </label>
        <input type="text" placeholder={'0.00'} value={tip} onChange={handleTipChange}  />
        <div className="summary">
          <div className="split">
            <label>Number of People</label>
            <div className="split-control">
              <button onClick={splitMinus}>-</button>
              <span>{split}</span>
              <button onClick={splitPlus}>+</button>
            </div>
          </div>
          <div className="Total Per Person">
            <label>Total Per Person</label>
            <span>{splitTotal}</span>
          </div>
          <div className="Tip Amount">
            <label>Tip Amount</label>
            <span>{tipAmount}</span>
          </div>
          <div className="Tip Amount Per Person">
            <label>Tip Amount Per Person</label>
            <span>{(tipAmount / split).toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  }

  export default App;
