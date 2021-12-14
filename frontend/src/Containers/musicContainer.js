import React from 'react';

import Player from '../Components/musicTab/player/Player'
import ChordChart from '../Components/musicTab/chord_chart/ChordChart'
import CustomAlert from '../Components/utils/CustomAlert'


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