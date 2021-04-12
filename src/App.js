import React, { useContext, useEffect } from 'react'
import Button from './components/Button';
import CountdownAnimation from './components/CountdownAnimation'
import SetPomodorro from './components/SetPomodorro'
import { SettingsContext } from './context/SettingsContext';

function App() {
  const { pomodorro, updateExecute, executing, setCurrentTimer, settingsBtn, startAnimate, startTimer, pauseTimer, children } = useContext(SettingsContext)
  useEffect(() => {
    updateExecute(executing)

  }, [executing, startAnimate])
  return (
    <div className='container'>
      <h1>Pomodorro</h1>
      <small>Be productive the right way</small>
        { pomodorro === 0 ?
          <SetPomodorro /> :
          <>
            <ul className='labels'>
              <li>
                <Button 
                  title='Work'
                  activeClass={executing.active === 'work' ? 'active-label' : undefined}
                  _callback={() => setCurrentTimer('work')}
                  />
              </li>
              <li>
                <Button 
                  title='Short Break'
                  activeClass={executing.active === 'short' ? 'active-label' : undefined}
                  _callback={() => setCurrentTimer('short')}
                  />
              </li>
              <li>
                <Button 
                  title='Long Break'
                  activeClass={executing.active === 'long' ? 'active-label' : undefined}
                  _callback={() => setCurrentTimer('long')}
                  />
              </li>

            </ul>
            <Button title='Settings' _callback={settingsBtn}/>
            <div className='time-container'>
              <div className='time-wrapper'> 
                <CountdownAnimation
                  keys={pomodorro}
                  timer={pomodorro}
                  animate={startAnimate}
                  > 
                  {children}
                </CountdownAnimation>
              </div>
            </div>
            <div className='button-wrapper'>
              <Button title='Start' activeClass={startAnimate ? undefined : 'active-label'} _callback={startTimer}/>
              <Button title='Pause' activeClass={startAnimate ? 'active-label' : undefined} _callback={pauseTimer}/>
            </div>
          </>
        }
      {/* <CountdownAnimation /> */}
    </div>
  );
}

export default App;
