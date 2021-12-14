import React from 'react';
import FluidAnimation from 'react-fluid-animation'

import { Select, Slider, Typography } from 'antd';

const { Title } = Typography;
const { Option } = Select;


export function FluidSimulatorContainer(props) {
    
    return (
        <FluidAnimation 
            config={props.values}
            // animationRef={animationRef}
            style={{ height: '90vh' }}/>
    )
}

export function FluidSimulatorsSidebar(props) {
    const {
        textureDownsample,
        densityDissipation,
        velocityDissipation,
        pressureDissipation,
        pressureIterations,
        curl,
        splatRadius,
    } = props.values;

    const setConfig = props.hooks;

    return (
          <div style={{padding: '10px'}}>
          <Title level={3}>Controls</Title>
          <hr/>
          {/* <Button 
            type="primary" 
            onClick={onClickRandomSplats}>Random Beams</Button> */}
          <br/>
          <Title level={5}>Texture Downsample:</Title>
          <Select defaultValue={textureDownsample || "0"} 
            onChange={e => setConfig({
                ...props.values,
                textureDownsample: e
            })}>
              <Option value="0">0</Option>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
          </Select>
  
          <div>
          <Title level={5}>
              Density Dissipation ({densityDissipation})
          </Title>
          <Slider
                  defaultValue={densityDissipation}
                  step={0.001}
                  min={0.9}
                  max={1.0}
                  value={densityDissipation}
                  onChange={e => setConfig({
                    ...props.values,
                    densityDissipation: e
                })} 
              />
          </div>
          <div>
          <Title level={5}>
              Velocity Difusion ({velocityDissipation})
          </Title>
          <Slider
                  defaultValue={velocityDissipation}
                  step={0.01}
                  min={0.9}
                  max={1}
                  value={velocityDissipation}
                  onChange={e => setConfig({
                    ...props.values,
                    velocityDissipation: e
                })}
              />
          </div>
  
          <div>
              <Title level={5}>
                  Pressure Difusion ({pressureDissipation})
              </Title>
              <Slider
                  defaultValue={pressureDissipation}
                  step={0.01}
                  min={0}
                  max={1}
                  value={pressureDissipation}
                  onChange={e => setConfig({
                    ...props.values,
                    pressureDissipation: e
                })} 
              />
          </div>
          <div>
          <Title level={5}>
              Pressure Iterations ({pressureIterations})
          </Title>
          <Slider
                  defaultValue={pressureIterations}
                  step={1}
                  min={1}
                  max={60}
                  value={pressureIterations}
                  onChange={e => setConfig({
                    ...props.values,
                    pressureIterations: e
                })} 
              />
          </div>
          <div>
          <Title level={5}>
              Curl ({curl})
          </Title>
          <Slider
              defaultValue={curl}
              step={1}
              min={0}
              max={50}
              value={curl}
              onChange={e => setConfig({
                ...props.values,
                curl: e
            })}
          />
          </div>
          <div>
          <Title level={5}>
              Splat Radius ({splatRadius})
          </Title>
          <Slider
              defaultValue={splatRadius}
              step={0.0001}
              min={0.00001}
              max={0.02}
              value={splatRadius}
              onChange={e => setConfig({
                ...props.values,
                splatRadius: e
            })} 
          />
          </div>
          {/* <Title level={5}>
              Random Splat
          </Title>
          <Button onClick={onClickRandomSplats}></Button>
          <Title level={5}>
              Reset Config
          </Title>
          <Button onClick={onReset}></Button> */}
      </div>
    );
  }