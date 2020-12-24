import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ResponsiveDrawer from './Components/sideMenu'
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [max_tokens, setMax_tokens] = useState(125);
  const [temperature, setTemperature] = useState(0.9);
  const [top_p, setTop_p] = useState(0.9);
  const [frequency_penalty, setFrequency_penalty] = useState(0.9);
  const [presence_penalty, setPresence_penalty] = useState(0.9);

  useEffect(() => {
      fetch('/time')
          .then((res) => res.json())
          .then((data) => {
              setCurrentTime(data.time);
          });
  }, []);

  // const namespace = '/gpt3';
  

  const socket = io('http://10.10.10.114:5000/', {
    transports: ['websocket']
  });

  socket.on('connect', function() {
      socket.emit('connected', {data: 'I\'m connected!'});
  });

  socket.on('completion', function(msg, cb) {
      console.log('got back response')
      console.log(msg.data)
      document.getElementById('log').append(msg.data);
      
      if (cb) {
          cb();
      }
  }); 
  
  const values = {
    prompt: prompt,
    max_tokens: max_tokens,
    temperature: temperature,
    top_p: top_p,
    frequency_penalty: frequency_penalty,
    presence_penalty: presence_penalty,
  }
  const hooks = {
    setMax_tokens,
    setTemperature,
    setTop_p,
    setFrequency_penalty,
    setPresence_penalty
  }

  const formEmit = function(event) {
    event.preventDefault();
    socket.emit('completion_request', values);
  };

  return (
    <div className='App'>
      {/* <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
        </header> */}
      <p>The current time is {currentTime}.</p>
      <ResponsiveDrawer values={values} hooks={hooks} />
      <div id="playground">
          <div id="playground_text">
              <form onSubmit={formEmit} id="emit" method="GET" action='#'>
                <textarea rows={30} cols={100} 
                  name="prompt_text" id="prompt_text" placeholder="Message"
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                />
                <br/>
                <input type="submit" value="Submit" />
              </form>
          </div>
          
      </div>

      <h2>Receive:</h2>
      <div id="log"></div>
    </div>
  );
}

export default App;
