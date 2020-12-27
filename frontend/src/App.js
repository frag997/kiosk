import React, { useState } from 'react';
import io from 'socket.io-client';

import { Layout, Menu, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

import CustomSidebar from './Components/sideBarComponent';
import FormComponent from './Components/formComponent';
import './App.css';

const { Header, Content, Footer, Sider } = Layout;
const { Title, Paragraph } = Typography;

function App() {
  const [engine, setEngine] = useState('');
  const [prompt, setPrompt] = useState('');
  const [max_tokens, setMax_tokens] = useState(125);
  const [temperature, setTemperature] = useState(0.9);
  const [top_p, setTop_p] = useState(0.9);
  const [frequency_penalty, setFrequency_penalty] = useState(0.9);
  const [presence_penalty, setPresence_penalty] = useState(0.9);
  const [stop_sequences, setStop_sequences] = useState([]);
  const [activeTab, setActiveTab] = useState(0);


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

  const tabs = [
    { 
      title: 'Bot Controller',
      content: (
        <Content className="site-layout-background">
          <Title level={3}>Type your Message here</Title>
          <FormComponent 
            prompt={prompt} 
            setPrompt={setPrompt} 
            formEmit={event => socket.emit('completion_request', values)} />
          <div style={{marginTop: '20px'}}>
            <Title>Response:</Title>
            <Paragraph>{prompt}</Paragraph>
          </div>
        </Content>
        ),
      value: 0,
      icon: <HomeOutlined />,
      sidebar:<CustomSidebar hooks={hooks} values={values} />
    },
    { 
      title: 'Music Controller',
      content: (
        <Content className="site-layout-background">
          <Title level={3}>Music Controller</Title>
        </Content>
        ),
      value: 1,
      icon: <HomeOutlined />,
      sidebar: <div><Title>hello music</Title></div>
    },
    { 
      title: 'Images Controller',
      content: (
        <Content className="site-layout-background">
          <Title level={3}>Images Controller</Title>
        </Content>
        ),
      value: 2,
      icon: <HomeOutlined />,
      sidebar: <div><Title>hello images</Title></div>
    }
  ]

  return (
    <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
      {
        tabs.map((tab, index) => {
          return <Menu.Item
            key={index} 
            icon={tab.icon}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.title}
          </Menu.Item>
        })
      }
      </Menu>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          {tabs[activeTab].sidebar}
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        {tabs[activeTab].content}
      </Layout>
    </Layout>
    <Footer>Mars.College</Footer>
  </Layout>
  );
}

export default App;
