import React, { Component } from 'react';
import sun from '../pics/1164891-weather/svg/046-sunny.svg';
import arrow from '../pics/arrow-pointing-to-right.svg';
import cloudy from '../pics/1164891-weather/svg/025-cloudy.svg';
import { transform } from '@babel/core';


class CityComp extends Component {

    constructor() {
      super()
      this.state = {
        expanded: 0
      }
      this.expand = this.expand.bind(this);
    }



    expand = () => {
      this.setState(prevState => ({expanded: !prevState.expanded}));
    }

    render() {
        return(
          <div
          className={this.state.expanded ? 'contentContainer1' : 'contentContainer2'}
          onClick = {this.expand}
          >
            <p className='city'>Rzeszów</p>
            <div className='coords'>
              <p>23°27'N</p>
              <p>23°27'S</p></div>
            <img className='weather' src={sun} alt='weatherPic'></img>
            <div className='temperature'>
              <div>23°C</div>
              <div>Pogodnie</div>
            </div>
            <div class='wind'>
              <div>
                <p>E</p>
                <img className = 'windArrow' src={arrow} alt='windArrow'></img>
              </div>
              <p className='bar'>999hPa</p>
            </div>
            <div className='next3Days'>
              <div>
                <div className='date3'>23.05</div>
                <img className='weather3' src={cloudy} alt='weather'></img>
                <div className='temp3'>20°C</div>
              </div>
              <div>
                <div className='date3'>23.05</div>
                <img className='weather3' src={cloudy} alt='weather'></img>
                <div className='temp3'>20°C</div>
              </div>
              <div>
                <div className='date3'>23.05</div>
                <img className='weather3' src={cloudy} alt='weather'></img>
                <div className='temp3'>20°C</div>
              </div>
            </div>
          </div>
        );
    }


}

export default CityComp;