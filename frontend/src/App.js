import React, { useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import { Layout, Menu, Typography } from 'antd';
// import { UserOutlined, LaptopOsutlined, NotificationOutlined } from '@ant-design/icons';
import CustomSidebar from './Components/sideBarComponent';
import FormComponent from './Components/formComponent';

// const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { Paragraph } = Typography;

function App() {
  const [engine, setEngine] = useState('');
  const [prompt, setPrompt] = useState('');
  const [max_tokens, setMax_tokens] = useState(125);
  const [temperature, setTemperature] = useState(0.9);
  const [top_p, setTop_p] = useState(0.9);
  const [frequency_penalty, setFrequency_penalty] = useState(0.9);
  const [presence_penalty, setPresence_penalty] = useState(0.9);
  const [stop_sequences, setStop_sequences] = useState([]);


  const socket = io('http://localhost:5000', {
    transports: ['websocket']
  });

  socket.on('connect', function() {
      socket.emit('connected', {data: 'I\'m connected!'});
  });

  socket.on('completion', async function(msg, cb) {
      console.log('got back response')
      console.log(msg.data)

      const newPrompt = prompt + ' ' + msg.data
      document.getElementById('log').append(newPrompt);
      setPrompt(newPrompt)

      if (cb) {
          cb();
      }
  }); 
  
  const values = {
    engine: engine,
    prompt: prompt,
    max_tokens: max_tokens,
    temperature: temperature,
    top_p: top_p,
    frequency_penalty: frequency_penalty,
    presence_penalty: presence_penalty,
    stop_sequences: stop_sequences
  }
  const hooks = {
    setEngine,
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
    <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">Bot Controller</Menu.Item>
        <Menu.Item key="2">Music Controller</Menu.Item>
        <Menu.Item key="3">Visuals Controller</Menu.Item>
      </Menu>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <CustomSidebar hooks={hooks} values={values} />
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <FormComponent prompt={prompt} setPrompt={setPrompt} formEmit={formEmit} />
        </Content>
        <Paragraph id='log' st/>
      </Layout>
    </Layout>
    <Footer>Footer ¢</Footer>
  </Layout>
  );
}

export default App;
