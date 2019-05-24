import React, { Component } from 'react';
import sunImg from '../pics/1164891-weather/svg/046-sunny.svg';
import arrowImg from '../pics/arrow-pointing-to-right.svg';
import cloudsImg from '../pics/1164891-weather/svg/025-cloudy.svg';
import rainImg from '../pics/1164891-weather/svg/049-rain.svg'
import snowImg from '../pics/1164891-weather/svg/016-snow.svg'
import fogImg from '../pics/1164891-weather/svg/050-fog.svg'
import { transform } from '@babel/core';


class CityComp extends Component {

    constructor(props) {
      super(props)
      this.state = {
        expanded: 0
      }
      this.expand = this.expand.bind(this);
    }



    expand = () => {
      this.setState(prevState => ({expanded: !prevState.expanded}));
    }

    render() {
        const weatherImgCurr = () => {
          let cloudy = this.props.weather;
          if (cloudy === 'Clear') {
            return sunImg;
          } else if (cloudy === 'Clouds') {
              return cloudsImg
          } else if (cloudy === 'Rain') {
              return rainImg
          } else if (cloudy === 'Snow') {
              return snowImg
          } else if (cloudy === 'Drizzle') {
              return fogImg
          } else return sunImg
        }

        const weatherDescrCurr = () => {
          let cloudy = this.props.weather;
          if (cloudy === 'Clear') {
            return 'Bezchmurnie';
          } else if (cloudy === 'Clouds') {
              return 'Pochmurno'
          } else if (cloudy === 'Rain') {
              return 'Deszcz'
          } else if (cloudy === 'Snow') {
              return 'Śnieg'
          } else if (cloudy === 'Drizzle') {
              return 'Mżawka'
          } else return ''
        }

        return(
          <div
          className={this.state.expanded ? 'contentContainer1' : 'contentContainer2'}
          onClick = {this.expand}
          >
            <p className='city'>{this.props.name}</p>
            <div className='coords'>
              <p>23°27'N</p>
              <p>23°27'S</p></div>
            <img className='weather' src={weatherImgCurr()} alt='weatherPic'></img>
            <div className='temperature'>
              <div>{Math.round(this.props.temp-273.3)}°C</div>
              <div>{weatherDescrCurr()}</div>
            </div>
            <div className='wind'>
              <div>
                <p>W</p>
                <img className = 'windArrow' src={arrowImg} alt='windArrow'></img>
              </div>
              <p className='bar'>{this.props.pressure}hPa</p>
            </div>
            <div className='next3Days'>
              <div>
                <div className='date3'>23.05</div>
                <img className='weather3' src={cloudsImg} alt='weather'></img>
                <div className='temp3'>20°C</div>
              </div>
              <div>
                <div className='date3'>23.05</div>
                <img className='weather3' src={cloudsImg} alt='weather'></img>
                <div className='temp3'>20°C</div>
              </div>
              <div>
                <div className='date3'>23.05</div>
                <img className='weather3' src={cloudsImg} alt='weather'></img>
                <div className='temp3'>20°C</div>
              </div>
            </div>
          </div>
        );
    }


}

export default CityComp;