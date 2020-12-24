import React, { useState } from 'react';
import io from 'socket.io-client';
import ResponsiveDrawer from './Components/sideBarComponent'
import MainComponent from './Components/formComponent';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [max_tokens, setMax_tokens] = useState(125);
  const [temperature, setTemperature] = useState(0.9);
  const [top_p, setTop_p] = useState(0.9);
  const [frequency_penalty, setFrequency_penalty] = useState(0.9);
  const [presence_penalty, setPresence_penalty] = useState(0.9);
  const [stop_sequences, setStop_sequences] = useState([]);


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

      const newPrompt = prompt + msg.data
      setPrompt(newPrompt)

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
    stop_sequences: stop_sequences
  }
  const hooks = {
    setPrompt,
    setMax_tokens,
    setTemperature,
    setTop_p,
    setFrequency_penalty,
    setPresence_penalty,
    setStop_sequences
  }

  const formEmit = function(event) {
    console.log('emit', event, values)
    event.preventDefault();
    socket.emit('completion_request', values);
  };
  
  return (
    <div className='App'>
      <ResponsiveDrawer values={values} hooks={hooks} />
      <MainComponent prompt={prompt} setPrompt={setPrompt} formEmit={formEmit} />
      <h2>Receive:</h2>
      <div id="log"></div>
    </div>
  );
}

export default App;
