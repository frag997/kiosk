import React from 'react';

import { Select, Slider, Typography } from 'antd';

const { Title, Paragraph } = Typography;
const { Option } = Select;

function CustomSidebar(props) {
  const {
    engine,
    max_tokens,
    temperature,
    top_p,
    frequency_penalty,
    presence_penalty,
    stop_sequences
  } = props.values;

  const {
    setEngine,
    setMax_tokens,
    setTemperature,
    setTop_p,
    setFrequency_penalty,
    setPresence_penalty,
    setStop_sequences,
  } = props.hooks;

  return (
        <div style={{padding: '10px'}}>
        <br/>
        <Title level={1}>Controls</Title>
        <Title level={5}>Engine:</Title>
        <Select defaultValue={engine} style={{ width: 150 }} onChange={e => setEngine(e)}>
            <Option value="davinci">davinci</Option>
            <Option value="curie">curie</Option>
            <Option value="babbage">babbage</Option>
            <Option value="ada">ada</Option>
        </Select>

        <div>
        <Title level={5}>
            Response Length ({max_tokens})
        </Title>
        <Slider  marks={{50: '50', 400: '400'}}
                defaultValue={max_tokens}
                step={1}
                min={50}
                max={400}
                value={max_tokens}
                onChange={(event) => {
                    setMax_tokens(event);
                }} 
            />
        </div>
        <div>
        <Title level={5}>
            Temperature ({temperature})
        </Title>
        <Slider marks={{0: '0', 1: '1'}}
                defaultValue={temperature}
                step={0.01}
                min={0}
                max={1}
                value={temperature}
                onChange={(event) => {
                setTemperature(event);
                }} 
            />
        </div>

        <div>
            <Title level={5}>
                Top P ({top_p})
            </Title>
            <Slider marks={{0: '0', 1: '1'}}
                defaultValue={top_p}
                step={0.01}
                min={0}
                max={1}
                value={top_p}
                onChange={(event) => {
                setTop_p(event);
                }} 
            />
        </div>

        <div>
        <Title level={5}>
            Frequency Penalty ({frequency_penalty})
        </Title>
        <Slider marks={{0: '0', 1: '1'}}
                defaultValue={frequency_penalty}
                step={0.01}
                min={0}
                max={1}
                value={frequency_penalty}
                onChange={(event) => {
                setFrequency_penalty(event);
                }} 
            />
        </div>
        <div>
        <Title level={5}>
            Presence Penalty ({presence_penalty})
        </Title>
        <Slider marks={{0: '0', 1: '1'}}
            defaultValue={presence_penalty}
            step={0.01}
            min={0}
            max={1}
            value={presence_penalty}
            onChange={(event) => {
            setPresence_penalty(event);
            }} 
            valueLabelDisplay="off"
        />
        </div>
        <div>
        <Title level={5}>
            Stop Sequences
        </Title>
        <Paragraph>Type the word, press Enter</Paragraph>
        <Select
            value={stop_sequences}
            onChange={event => {
                setStop_sequences(event)
            }} 
            placeholder="Stop Words"
            mode="tags"
            tokenSeparators={[',']} 
            size={'large'} 
            dropdownStyle={{ display: 'none' }}
            style={{ width: '100%'}}>
        </Select>
        {/* <TextArea rows={4} /> */}
        </div>
    </div>
  );
}

export default CustomSidebar;