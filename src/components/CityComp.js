import React, { Component } from 'react';
import sun from '../pics/1164891-weather/svg/046-sunny.svg'

class CityComp extends Component {
    render() {
        return(
            <div className='contentContainer'>
                <p className='city'>Rzeszów</p>
                <div><p>23°27'N</p><p>23°27'S</p></div>
                <img className='weather' src={sun} alt='weatherPic'></img>
            </div>
        );
    }
}

export default CityComp;