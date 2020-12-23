import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
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
  

  const socket = io('http://localhost:5000', {
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

  const formEmit = function(event) {
    event.preventDefault();
    const values = {
        prompt: prompt,
        max_tokens: max_tokens,
        temperature: temperature,
        top_p: top_p,
        frequency_penalty: frequency_penalty,
        presence_penalty: presence_penalty,
      }
      socket.emit('completion_request', values);
  };


 
  
  return (
    <div className='App'>
      {/* <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
        </header> */}


      <p>The current time is {currentTime}.</p>
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
          <div id="playground_menu">
              <label htmlFor="engines">Engine:</label>
              <select name="engines" id="engines">
                <option value="davinci">davinci</option>
                <option value="curie">curie</option>
                <option value="babbage">babbage</option>
                <option value="ada">ada</option>
              </select> 
          
              <h3>
                  Response Length ({max_tokens})
                  <br/>
                  <input 
                    type="range" min="50" max="400" 
                    step="1" className="slider" id="max_tokens"
                    value={max_tokens} 
                    onChange={e => setMax_tokens(e.target.value)} 
                  />
              </h3>
              <h3>
                  Temperature (<span id="temperature_val">{temperature}</span>)
                  <br/>
                  <input 
                    type="range" min="0" max="1" 
                    step="0.01" className="slider" id="temperature"
                    value={temperature} 
                    onChange={e => setTemperature(e.target.value)}  
                  />
              </h3>

              <h3>
                  Top P (<span id="top_p_val">{top_p}</span>)
                  <br/>
                  <input 
                    type="range" min="0" max="1" 
                    step="0.01" className="slider" id="top_p"
                    value={top_p} 
                    onChange={e => setTop_p(e.target.value)} 
                  />
              </h3>

              <h3>
                  Frequency Penalty (<span id="frequency_penalty_val">{frequency_penalty}</span>)
                  <br/>
                  <input 
                    type="range" min="0" max="1" 
                    step="0.01" className="slider" id="frequency_penalty" 
                    value={frequency_penalty} 
                    onChange={e => setFrequency_penalty(e.target.value)} 
                  />
              </h3>
              <h3>
                  Presence Penalty (<span id="presence_penalty_val">{presence_penalty}</span>)
                  <br/>
                  <input 
                    type="range" min="0" max="1" 
                    step="0.01" className="slider" id="presence_penalty"
                    value={presence_penalty} 
                    onChange={e => setPresence_penalty(e.target.value)} 
                  />
              </h3>
              <h3>
                  Stop Sequences
              </h3>
          </div>
      </div>

      <h2>Receive:</h2>
      <div id="log"></div>
    </div>
  );
}

export default App;
