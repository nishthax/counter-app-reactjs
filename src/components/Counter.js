import React, { useState, useEffect } from 'react';
import './Counter.css';

function Counter() {
  const initialMins = parseInt(localStorage.getItem('savedMins')) || 5;
  const initialSecs = parseInt(localStorage.getItem('savedSecs')) || 0;

  const [mins, setMins] = useState(initialMins);
  const [secs, setSecs] = useState(initialSecs);
  const [isRunning, setRunning] = useState(false);

  const resetCounter = () => {
    setRunning(false);
    setMins(5);
    setSecs(0);
    localStorage.removeItem('savedMins');
    localStorage.removeItem('savedSecs');
  };

  const startCounter = () => {
    setRunning(true);
  };

  const stopCounter = () => {
    setRunning(false);
    localStorage.setItem('savedMins', mins.toString());
    localStorage.setItem('savedSecs', secs.toString());
  };

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        if (secs === 0) {
          if (mins === 0) {
            clearInterval(timer);
            setRunning(false);
          } else {
            setMins(prevMins => prevMins - 1);
            setSecs(59);
          }
        } else {
          setSecs(prevSecs => prevSecs - 1);
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
      localStorage.setItem('savedMins', mins.toString());
      localStorage.setItem('savedSecs', secs.toString());
    };
  }, [isRunning, mins, secs]);

  let timerClass = '';

  if (isRunning) {
    if (mins === 0 && secs <= 10) {
      timerClass = 'red-blink';
    } else if ((mins === 3 && secs <= 30) || (mins <= 3)) {
      timerClass = 'orange';
    } else {
      timerClass = 'green';
    }
  }

  return (
    <div className='body'>
      <div className={`counter ${timerClass}`}>
        <p className='time'>
        {mins < 10 ? `0${mins}` : mins}<span className='txt'> m</span> {secs < 10 ? `0${secs}` : secs}<span className='txt'> s</span>
        </p>
        <hr />
        <div className='buttons'>
            <button onClick={startCounter} className='startbtn'>Start</button>
            <button onClick={stopCounter} className='stopbtn'>Stop</button>
            <button onClick={resetCounter} className='resetbtn'>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default Counter;
