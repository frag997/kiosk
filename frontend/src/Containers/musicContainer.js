import React from 'react';
import { Input } from 'antd';
import Player from '../Components/player/Player'
import ChordChart from '../Components/chord_chart/ChordChart'
import CustomAlert from '../Components/utils/CustomAlert'

const { TextArea } = Input;

function MusicContainer(props) {        
    return (
        <div>
            <Player />
            <ChordChart />
            <CustomAlert />
        </div>
    )
}

export default MusicContainer;