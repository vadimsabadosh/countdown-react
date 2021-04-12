import React, { createContext, useState } from 'react';

export const SettingsContext = createContext()

const SettingsContextProvider = (props) => {

  const [pomodorro, setPomodorro] = useState(0);
  const [executing, setExecuting] = useState({});
  const [startAnimate, setStartAnimate] = useState(false);



  const startTimer = () => {
    setStartAnimate(true)
  }
  const pauseTimer = () => {
    setStartAnimate(false)
  }
  const stopTimer = () => {
    setStartAnimate(false)
  }
  const setCurrentTimer = active_state => {
    updateExecute({
      ...executing,
      active: active_state
    });
    setTimerTime(executing)
  }
  const updateExecute = updateSettings => {
    setExecuting(updateSettings)
    setTimerTime(updateSettings)
  }

  const settingsBtn = () => {
    setExecuting({})
    setPomodorro(0)
  }

  const setTimerTime = evalute => {
    switch (evalute.active) {
      case 'work':
        setPomodorro(evalute.work)
        break;
      case 'long':
        setPomodorro(evalute.long)
        break;
      case 'short':
        setPomodorro(evalute.short)
        break;
    
      default:
        setPomodorro(0)
        break;
    }
  }

  const children = ({ remainingTime }) => {

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes}:${seconds}`
  }

  return (
    <SettingsContext.Provider value={{stopTimer, updateExecute, pomodorro, 
      executing, startAnimate, startTimer, pauseTimer, settingsBtn, setCurrentTimer, updateExecute, children}}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;