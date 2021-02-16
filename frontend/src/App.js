import React, { useState } from 'react';
import { Layout, Menu, Typography } from 'antd';
import { RobotOutlined, CalendarOutlined, CloudOutlined, SoundOutlined, FireOutlined } from '@ant-design/icons';

import { BotCustomSidebar, BotFormComponent } from './Containers/botControllerContainer';
import { CalendarContainer, CalendarToolbar } from './Containers/calendarContainer';
import { FluidSimulatorContainer, FluidSimulatorsSidebar }from './Containers/fluidSimulatorContainer'
import WeatherContainer from './Containers/weatherContainer';
// import MusicContainer from './Containers/musicContainer';

import ChordChart from './Components/musicTab/chord_chart/ChordChart'
import { socket } from './API'

import './App.css';
import LogoImage from './images/logo.png'

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

function App() {
 
  const [botConfig, setBotConfig] = useState({
    engine: 'davinci',
    prompt: '',
    max_tokens: 125,
    temperature: 0.9,
    top_p: 0.9,
    frequency_penalty: 0.9,
    presence_penalty: 0.9,
    stop_sequences: [],
  });

  const [fluidConfig, setFluidConfig] = useState({
    textureDownsample: 1,
    densityDissipation: 0.98,
    velocityDissipation: 0.99,
    pressureDissipation: 0.8,
    pressureIterations: 25,
    curl: 30,
    splatRadius: 0.005,
    animationRef: ''
  });

  const [activeTab, setActiveTab] = useState(0);
  
  socket.on('completion', async function (msg, cb) {
    const newPrompt = prompt + ' ' + msg.data
    setBotConfig({
      ...botConfig,
      prompt: newPrompt
    })
  });
  
  const tabs = [
    { 
      title: 'Bots',
      content: (
        <Content className="site-layout-background">
          <Title level={1}>Bot Controller</Title>
          <BotFormComponent 
            prompt={botConfig.prompt} 
            formEmit={event => socket.emit('completion_request', botConfig)} />
        </Content>
        ),
      icon: <RobotOutlined />,
      sidebar:<BotCustomSidebar values={botConfig}  hooks={setBotConfig}/>
    },
    {
      title: 'Calendar',
      content: (
        <Content className="site-layout-background">
          <Title level={3}>Calendar</Title>
          <CalendarContainer/>
        </Content>
        ),
      icon: <CalendarOutlined />,
      sidebar: <div><CalendarToolbar/></div>
    },
    {
      title: 'Weather',
      content: (
        <Content className="site-layout-background">
          <Title level={3}>Weather Forecast</Title>
          <WeatherContainer/>
        </Content>
        ),
      icon: <CloudOutlined />,
      sidebar: <div><Title>Weather Forecast</Title></div>
    },
    { 
      title: 'Images',
      content: (
        <Content className="site-layout-background">
          <Title level={3}>Click To Play</Title>
          <FluidSimulatorContainer values={fluidConfig} hooks={setFluidConfig}/>
        </Content>
        ),
      icon: <FireOutlined />,
      sidebar: <div><FluidSimulatorsSidebar values={fluidConfig} hooks={setFluidConfig} /></div>
    },
    { 
      title: 'Music',
      content: (
        <Content className="site-layout-background">
          <Title level={3}>Music Controller</Title>
          {/* <MusicContainer /> */}
        </Content>
        ),
      icon: <SoundOutlined />,
      sidebar: <div><ChordChart /></div>
    },
  ]

  return (
    <Layout>
    <Header className="header">
      <div className="logo">
        <img 
          src={LogoImage} 
          style={{ width: 64, height: 64, backgroundImage: {LogoImage}, float:'left', backgroundColor:'#3d3d3d'}}
          alt="logo"
        ></img>
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
      {
        tabs.map((tab, index) => {
          tab.value = index;
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
