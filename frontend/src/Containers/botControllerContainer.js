import React from 'react';
import { Select, Slider, Input, Typography } from 'antd';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const { TextArea } = Input;

export function BotFormComponent(props) {
    const { prompt, formEmit } = props;
    
    return (
        <div>
            <Title level={4}>Type your Message here:</Title>
            <form 
                onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                formEmit(event)
            }} 
                id="noter-text-area" 
                method="GET" action='#'>
                <TextArea
                    id="textarea"
                    value={prompt}
                    onChange={e => props.hooks({
                        ...props.values,
                        prompt: e.target.value
                    })}
                    placeholder="Type your message"
                    autoSize={{ minRows: 18 }}
                />
                <input type="submit" value="Save" />
            </form>
            <div style={{marginTop: '20px'}}>
                <Title>Bot Response:</Title>
                <Paragraph>{prompt}</Paragraph>
            </div>
        </div>
    )
}

export function BotCustomSidebar(props) {
  const {
    engine,
    max_tokens,
    temperature,
    top_p,
    frequency_penalty,
    presence_penalty,
    stop_sequences
  } = props.values;
  
  const setConfig = props.hooks;
  
  return (
        <div style={{padding: '10px'}}>
        <br/>
        <Title level={1}>Controls</Title>
        <Title level={5}>Engine:</Title>
        <Select 
        defaultValue={engine || "davinci"} 
        style={{ width: 150 }} 
        onChange={e => setConfig({
            ...props.values,
            engine: e
        })}>
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
                onChange={e => setConfig({
                    ...props.values,
                    max_tokens: e
                })} 
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
                onChange={e => setConfig({
                    ...props.values,
                    temperature: e
                })}
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
                onChange={e => setConfig({
                    ...props.values,
                    top_p: e
                })}
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
                onChange={e => setConfig({
                    ...props.values,
                    frequency_penalty: e
                })}
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
            onChange={e => setConfig({
                    ...props.values,
                    presence_penalty: e
                })}
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
            onChange={e => setConfig({
                    ...props.values,
                    stop_sequences: e
                })}
            placeholder="Stop Words"
            mode="tags"
            tokenSeparators={[',']} 
            size={'large'} 
            dropdownStyle={{ display: 'none' }}
            style={{ width: '100%'}}>
        </Select>
        </div>
    </div>
  );
}